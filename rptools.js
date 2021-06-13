var express = require("express")
var app = express()
var exphbs = require('express-handlebars')
var fs = require('fs')
var hbs = exphbs.create({})
var port = 3000

/*Contains all the themes and theme overviews needed
to create descriptions */
var buildGen = require("./public/tempgen.js")

var themeData = require("./themes/themeList.json")
var postData = require("./posts/postData.json")
var genType = ""
var genThemes = [""]
var description =""
console.log(themeData)

//Helper function for handlebars checkboxes
hbs.handlebars.registerHelper('isRoom', function(value)
{
    return value == "Room"
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static('public'));

app.listen(port, SuccsessfulConnection)
function SuccsessfulConnection() {
    console.log("\nrptools.js successfully connected to port ", port) }

app.use(RequestReceived)
function RequestReceived(req, res, next) {
    console.log("Request received:")
    console.log("\turl: ", req.url)
    console.log("\tmethod: ", req.method)
    console.log("\theaders: ", req.headers)
    next()
}

app.get("/", GiveHome)
function GiveHome(req, res, next) {
    res.status(200).render('index', {themesData: themeData, postsData: postData})
}








/****************************************Generation functions****************************************************** */

/*When a user goes to generate a new description, this function
is called. It adds *all* themes selected by the user*/
function AddAllSelectedThemes() {

    var selectedThemes = []

    /*Each element in "genThemes" corrosponds to the keyphrase of an
    item in the js object "buildgen.themes". */
    for(i=0; i < genThemes.length; i++ ) {
        if( buildGen.themes[genThemes[i]] ) {
            selectedThemes.push(buildGen.themes[genThemes[i]])
        } else {
            console.log("Error the " + i + "th buildGen theme DNE.")
        }
    }

    console.log("==Selected themes:", selectedThemes)

    return selectedThemes

}

/*Provides a randomized transitional phrase, followed by paragraph
formatting (line break + tab)*/
function TransitonalPhrase(roomSegment) {
    var nTransitions = 5
    var rTrasition = Math.floor(Math.random() * nTransitions)

    if(rTrasition == 0) {
        return ("In the " + roomSegment + " of the room...\n\t")
    } else if (rTrasition == 1) {
        return ("Looking to the " + roomSegment + " of the room...\n\t")
    } else if (rTrasition == 2) {
        return ("Observing the " + roomSegment + " of the room...\n\t")
    } else if (rTrasition == 3) {
        return ("Investigating the " + roomSegment + " of the room...\n\t")
    } else {
        return ("Moving to the " + roomSegment + " of the room...\n\t")
    }

}

/*Generates a random number from zero up to but not including max*/
function RandNum(max) {
    return Math.floor(Math.random() * max) }


/****************************************Generation functions****************************************************** */


/*Currently gives the same response as giving the home page.
This is because currently the homepage houses all the html functionality
required for buildgen */
app.get("/buildgen", GiveGen)
function GiveGen(req, res, next) {

    res.status(200).render('index', {themesData: themeData, postsData: postData, type: genType, postData: description})
    console.log(genType)
    console.log(genThemes)
}


app.post("/buildgen/newGen", function(req,res,next) {
    console.log("== req.body:", req.body)
    genType = req.body.themeType
    genThemes = req.body.theme

    /*Takes in user selected themes and returns an array of the selected themes*/
    var selectedThemes = AddAllSelectedThemes()

    /*The descriptor container. Begins each descriptor with paragraph
    formatting (line break + tab) followed by a random transitional phrase*/
    /*Filled with actual descriptions below */
    var descriptors = {
        north : ("\n\t" + TransitonalPhrase("North end")),
        east : ("\n\t" + TransitonalPhrase("East end")),
        south : ("\n\t" + TransitonalPhrase("South end")),
        west : ("\n\t" + TransitonalPhrase("West end")),
        center : ("\n\t" + TransitonalPhrase("Center")),
        overview : "\t"
    }

    /*The description that will be sent to the client. Composed of
    all descriptors */
    description = (
        descriptors.overview
        + descriptors.north
        + descriptors.east
        + descriptors.south
        + descriptors.west
        + descriptors.center
    )

})

app.post("/post/newPost", function(req,res,next) {
    console.log("== req.body:", req.body)
    postData.push({
        postName: req.body.postName,
		postType: req.body.postType,
		postAuthor: req.body.postAuthor,
		postDate: req.body.postDate,
		postData: req.body.postData
    })
    fs.writeFile(
        __dirname + '/posts/postData.json',
        JSON.stringify(postData, null, 2),
        function (err) {
          if (err) {
            res.status(500).send("Error writing new data.  Try again later.")
          } else {
            res.status(200).send()
          }
        }
    )
    //next()
})

var descriptors = require("./public/buildgen.js")
const { themes } = require("./public/buildgen.js")
//dump description into the description variable
//console.log("Test:", descriptors)

app.get("/post/:n", function(req,res,next){
    var postNum = parseInt(req.params.n);
    var post = postData[postNum]
	// Only render a single post if it has a valid index
	if(post) {
		res.status(200).render('singlePostPage', {post: post})
	} else {
		next()
	}
})

app.get("*", function(req,res,next){
    res.status(404).render('404Page')
})
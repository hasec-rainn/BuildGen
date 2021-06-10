var express = require("express")
var app = express()
var exphbs = require('express-handlebars')
var fs = require('fs')
var hbs = exphbs.create({})
var port = 3000

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

/*Array of string arrays. 2D matrix containing all selected themes, 
used to pick a random description from a random theme*/
    var themeArr = []

/*Array of string arrays. 2D matrix containing all selected themes' 
overviews, used to pick a random description from a random theme*/
    var theme_overviewArr = []

/*Adds in *a* corrosponding theme to themeArr and theme_overviewArr 
if the user selected that theme*/
function AddTheme(themeCheckbox, theme, theme_overview) {
    /*If this theme's themeCheckbox is selected, add it into arrays*/
    if(themeCheckbox) {
        themeArr.push(theme)
        theme_overviewArr.push(theme_overview)
    }
}

/*When a user goes to generate a new description, this function
is called. It adds *all* themes selected by the user*/
function AddAllSelectedThemes() {

/*If *a* particular theme was selected, pushes its theme and
theme_overview variables to themeArr and theme_overviewArr
respectively*/
/*Currently not functional; true needs to be replaced */
    
/*Array of string arrays. 2D matrix containing all selected themes, 
used to pick a random description from a random theme*/
    themeArr = []

/*Array of string arrays. 2D matrix containing all selected themes' 
overviews, used to pick a random description from a random theme*/
    theme_overviewArr = []

    var i = 0;
    /*Adds in each theme from theme arrays*/
    if(genThemes[i].includes("General Shop")) {
        AddTheme(true, 2, 2)
        if(genThemes.length < i + 1) { 
            i++ }
    }

    if(genThemes[i].includes("Goblin Cave")) {
        AddTheme(true, 3, 3)
        if(genThemes.length < i + 1){
            i++ }
    }

    if(genThemes[i].includes("Magic Shop")){
        AddTheme(true, 1, 1)
        if(genThemes.length < i + 1) {
            i++ }
    }

    if(genThemes[i].includes("Spooky")) {
        AddTheme(true, 0, 0)
        if(genThemes.length < i + 1) {
            i++ }
    }

    if(genThemes[i].includes("Wizard Tower")) {
        AddTheme(true, 4, 4)
        if(genThemes.length < i + 1) {
            i++ }
    }

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

app.post("/buildgen/newGen", function(req,res,next) {
    console.log("== req.body:", req.body)
    genType = req.body.themeType
    genThemes = req.body.theme


    /*Houses all themes and theme overviews in arrays. Is a Js object */
    AddAllSelectedThemes()
    var buildGen = require("./public/buildgen.js")

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

    var randomTheme = null

    /*sets descriptors.north as a random description from a random theme*/
    randomTheme = themeArr[ RandNum(themeArr.length)]
    descriptors.north += buildGen.themes[randomTheme][RandNum(buildGen.themes[randomTheme].length)]

    /*sets descriptors.south as a random description from a random theme*/
    randomTheme = themeArr[ RandNum(themeArr.length)]
    descriptors.south += buildGen.themes[randomTheme][RandNum(buildGen.themes[randomTheme].length)]

    /*sets descriptors.east as a random description from a random theme*/
    randomTheme = themeArr[ RandNum(themeArr.length)]
    descriptors.east += buildGen.themes[randomTheme][RandNum(buildGen.themes[randomTheme].length)]

    /*sets descriptors.west as a random description from a random theme*/
    randomTheme = themeArr[ RandNum(themeArr.length)]
    descriptors.west += buildGen.themes[randomTheme][RandNum(buildGen.themes[randomTheme].length)]

    /*sets descriptors.center as a random description from a random theme*/
    randomTheme = themeArr[ RandNum(themeArr.length)]
    descriptors.center += buildGen.themes[randomTheme][RandNum(buildGen.themes[randomTheme].length)]

    /*sets descriptors.overview as a random description from a random theme/theme_overview*/
    var randomOverview = theme_overviewArr[RandNum(theme_overviewArr.length)]
    descriptors.overview += buildGen.overviews[randomOverview][RandNum(buildGen.overviews[randomOverview].length)]

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
/*********************************Begin Required Files***********************************************************/
var fs = require("fs")

/*All theme files read in. *Only* use these for the purpose of 
splitting them up into string arrays.*/
    var spooky = fs.readFileSync("./themes/spooky.txt","utf8")
    var spooky_overview = fs.readFileSync("./themes/spooky_overview.txt","utf8")
    var magicshop = fs.readFileSync("./themes/magicshop.txt","utf8")
    var magicshop_overivew = fs.readFileSync("./themes/magicshop_overview.txt","utf8")
    var generalshop = fs.readFileSync("./themes/generalshop.txt","utf8")
    var generalshop_overview = fs.readFileSync("./themes/generalshop_overview.txt","utf8")
    var goblinCave = fs.readFileSync("./themes/goblinCave.txt", "utf8")
    var goblinCave_overview = fs.readFileSync("./themes/goblinCave_overview.txt", "utf8")
    var wizardTower = fs.readFileSync("./themes/wizardTower.txt", "utf8")
    var wizardTower_overview = fs.readFileSync("./themes/wizardTower_overview.txt", "utf8")

/*Themes split up into string arrays. Each element is its own description*/
    var spooky = spooky.split("\n")
    var spooky_overview = spooky_overview.split("\n")
    var magicshop = magicshop.split("\n")
    var magicshop_overview = magicshop_overivew.split("\n")
    var generalshop = generalshop.split("\n")
    var generalshop_overview = generalshop_overview.split("\n")
    var goblinCave = goblinCave.split("\n")
    var goblinCave_overview = goblinCave_overview.split("\n")
    var wizardTower = wizardTower.split("\n")
    var wizardTower_overview = wizardTower_overview.split("\n")

/**************************************End Required Files********************************************************/
/*The above should only be called once (when the page is initially loaded) */


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
    AddTheme(true, spooky, spooky_overview)
    AddTheme(true, magicshop, magicshop_overview)
    AddTheme(true,generalshop, generalshop_overview)
    AddTheme(true,goblinCave, goblinCave_overview)
    AddTheme(true,wizardTower, wizardTower_overview)
}

AddAllSelectedThemes()

/*Provides a randomized transitional phrase, followed by paragraph
formatting (line break + tab)*/
function TransitonalPhrase(roomSegment) {
    var nTransitions = 3
    var rTrasition = Math.floor(Math.random() * nTransitions)

    if(rTrasition == 0) {
        return ("In the " + roomSegment + " of the room...\n\t")
    } else if (rTrasition == 1) {
        return ("Looking to the " + roomSegment + " of the room...\n\t")
    } else {
        return ("Observing the " + roomSegment + " of the room...\n\t")
    }

}

/*The descriptor container. Begins each descriptor with paragraph
formatting (line break + tab) followed by a random transitional phrase*/
    var descriptors = {
        north : ("\n\t" + TransitonalPhrase("North end")),
        east : ("\n\t" + TransitonalPhrase("East end")),
        south : ("\n\t" + TransitonalPhrase("South end")),
        west : ("\n\t" + TransitonalPhrase("West end")),
        center : ("\n\t" + TransitonalPhrase("Center")),
        overview : "\t"
    }

/*Generates a random number from zero up to but not including max*/
    function RandNum(max) {
        return Math.floor(Math.random() * max) }


/*Repeats 5 times to fill in the first 5 descriptors. Could be made more efficient*/
    var randomTheme = null
    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.north += randomTheme[ RandNum(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.east += randomTheme[ RandNum(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.south += randomTheme[ RandNum(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.west += randomTheme[ RandNum(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.center += randomTheme[ RandNum(randomTheme.length) ]

/*Fills in the last descriptor: overview*/
    randomTheme = theme_overviewArr[ RandNum(theme_overviewArr.length) ]
    descriptors.overview = randomTheme[ RandNum(randomTheme.length) ]

/*Prints out what is contained in descriptors in the order that it
would be printed out in the description container*/
module.exports = descriptors
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

var buildGen = {
    themes: [
        spooky,
        magicshop,
        generalshop,
        goblinCave,
        wizardTower
    ],

    overviews: [
        spooky_overview,
        magicshop_overivew,
        generalshop_overview,
        goblinCave_overview,
        wizardTower_overview
    ]

}

/*Prints out what is contained in descriptors in the order that it
would be printed out in the description container*/
module.exports = buildGen
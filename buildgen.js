var fs = require("fs")

/*All theme files read in. Not yet split up with split.*/
    var spooky = fs.readFileSync("./themes/spooky.txt","utf8")
    var spooky_overview = fs.readFileSync("./themes/spooky_overview.txt","utf8")
    var magicshop = fs.readFileSync("./themes/magicshop.txt","utf8")
    //var magicshop_overivew = fs.readFileSync("./themes/spooky_overview.txt","utf8")

/*Themes split up string arrays. Each element is its own description*/
    var spookyArr = spooky.split("\n")
    var spooky_overviewArr = spooky_overview.split("\n")
    var magicshopArr = magicshop.split("\n")

/*Array of string arrays. 2D matrix containing all themes, 
used to pick a random description from a random theme*/
    var themeArr = [
        spookyArr,
        magicshopArr
    ]

/*Array of string arrays. 2D matrix containing all themes' overview, 
used to pick a random description from a random theme*/
    var theme_overviewArr = [
        spooky_overviewArr
    ]

/*The descriptor container*/
    var descriptors = {
        north : "",
        east : "",
        south : "",
        west : "",
        center : "",
        overview : ""
    }








/*Generates a random number from zero up to but not including max*/
function RandNum(max) {
    return Math.floor(Math.random() * max) }

/*Generates a random number from 1 up to but not including max*/
function RandNumMod(max) {
    return Math.floor((Math.random() * (max-1)) + 1) }


/*Repeats 5 times to fill in the first 5 descriptors. Could be made more efficient*/
    var randomTheme = null
    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.north = randomTheme[ RandNumMod(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.east = randomTheme[ RandNumMod(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.south = randomTheme[ RandNumMod(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.west = randomTheme[ RandNumMod(randomTheme.length) ]

    randomTheme = themeArr[ RandNum(themeArr.length) ]
    descriptors.center = randomTheme[ RandNumMod(randomTheme.length) ]

/*Fills in the last descriptor: overview*/
    randomTheme = theme_overviewArr[ RandNum(theme_overviewArr.length) ]
    descriptors.overview = randomTheme[ RandNumMod(randomTheme.length) ]


console.log("North: ", descriptors.north)
console.log("East: ", descriptors.east)
console.log("South: ", descriptors.south)
console.log("West: ", descriptors.west)
console.log("Center: ", descriptors.center)
console.log("Overview: ", descriptors.overview)
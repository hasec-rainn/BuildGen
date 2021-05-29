var fs = require("fs")

/*Generates a random number from zero up to but not including max*/
    function RandNum(max) {
        return Math.floor(Math.random() * max) }

/*Generates a random number from 1 up to but not including max*/
    function RandNumMod(max) {
        return Math.floor((Math.random() * (max-1)) + 1) }

/*All theme files read in. Not yet split up with split.*/
    var template = fs.readFileSync("./themes/theme_template.txt","utf8")
    var spooky = fs.readFileSync("./themes/spooky.txt","utf8")

/*Themes split up string arrays. Each element is its own description*/
    var templateArr = template.split("\n")
    var spookyArr = spooky.split("\n")

/*Array of string arrays. 2D matrix used to pick a random description
from a random theme*/
    var themeArr = [
        templateArr,
        spookyArr
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

var randomTheme = null

/*Repeats 5 times to fill in the first 5 descriptors*/
for(i=0; i<5; i++) {
    randomTheme = themeArr[ RandNum(themeArr.length) ]
    console.log("Random output: ", randomTheme[ RandNumMod(randomTheme.length) ])
}
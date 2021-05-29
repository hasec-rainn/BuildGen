var fs = require("fs")

/*Generates a random number from zero up to and including max*/
    function RandNum(max) {
        return Math.floor(Math.random() * (max+1)) }

/*All theme files read in. Not yet split up with split.*/
    var template = fs.readFileSync("./themes/theme_template.txt","utf8")

/*Themes split up string arrays. Each element is its own description*/
    var templateArr = template.split("\n")

/*Array of string arrays. 2D matrix*/
    themeArr = {templateArr}

/*The descriptor container*/
var descriptors = {
    north : "",
    east : "",
    south : "",
    west : "",
    center : "",
    overview : ""
}

console.log("Output: ", template)
console.log("Output 2: ", templateArr[0])



var express = require("express")
var app = express()
var port = PORT

app.listen(port, SuccsessfulConnection)
function SuccsessfulConnection() {
    console.log("\nSuccessfully connected to port ", port) }
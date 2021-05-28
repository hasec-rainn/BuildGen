
var express = require("express")
var app = express()
var port = 3000

app.listen(port, SuccsessfulConnection)
function SuccsessfulConnection() {
    console.log("\nSuccessfully connected to port ", port) }

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
    next()
}
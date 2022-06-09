const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.use(express.static("public"))


app.get("/", (req, res)=>{
    res.send("Wecome to a new Project!")
})

const port = 3000

app.listen(port, (err)=>{
    if(!err) {
        console.log("Sever running on port: " + port);
    }
})
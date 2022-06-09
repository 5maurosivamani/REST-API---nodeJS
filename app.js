const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = mongoose.Schema({
    title: String,
    content: String
}) 

const Article = mongoose.model("Article", articleSchema)


app.get("/", (req, res)=>{
    res.send("Wecome to a new Project!")
})

// REST API Example 

///////////////////////////////////////// REQUEST TO TARGETIG ALL ARTICLES /////////////////////////////////////////

app.route("/articles")

// Get Route 
.get((req, res)=>{
    Article.find((err, foundArticles)=>{
        if(!err) {
            res.send(foundArticles)
        } else {
            res.send( err )
        }
    })
})

// Post Route 
.post((req, res)=>{
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save((err)=>{
        if(!err) {
            res.send("Successfully Inserted!")
        } else {
            res.send( err )
        }
    })
})

// Delete Route 
.delete((req, res)=>{
    Article.deleteMany((err)=>{
        if(!err) {
            res.send("Successfully Deleted!")
        } else {
            res.send( err )
        }
    })
});

///////////////////////////////////////// REQUEST TO TARGETTING THE SPECIPIC ARTICLE /////////////////////////////////////////

app.route("/articles/:articleTitle")

// GET REQUEST
.get((req, res)=>{

    Article.findOne({title: req.params.articleTitle}, (err, foundArticle)=>{
        if(!err){
            if(foundArticle) {
                res.send(foundArticle)
            } else {
                res.send("No articles matches that title was found.")
            }
        } else {
            res.send( err )
        }
    })
}) 

// PUT REQUEST
.put((req, res)=>{
    Article.findOneAndUpdate(
        { titie: req.params.articleTitle },
        { title: req.body.title, content: req.body.content },
        { overwrite: true },
        (err) => {
            if(!err) {
                res.send("Successfully Updated that article.")
            } else {
                res.send(err)
            }
        } 
    )
})

// PATCH REQUEST
.patch((req, res)=>{
    Article.updateOne(
        { title: req.params.articleTitle },
        {$set: req.body },
        (err) => {
            if(!err) {
                res.send("Successfully Updated.")
            } else {
                res.send( err )
            }
        }
    )
})

// DELETE REQUEST
.delete((req, res) => {
    Article.deleteOne(
        { title: req.params.articleTitle },
        (err) => {
            if(!err) {
                res.send("Successfully Deleted!")
            } else {
                res.send(err)
            }
        }
    )
});

const port = 3000

app.listen(port, (err)=>{
    if(!err) {
        console.log("Sever running on port: " + port);
    }
})
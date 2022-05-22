
/* -------node.js app boilerplate--------*/

//npm modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//configure Express server
const app = express();
const PORT = process.env.PORT || 3000;                       //3000 for testing
app.use(bodyParser.urlencoded({ extended: true }));


//Start server listing
app.listen(PORT, function () {
    console.log("Web server running on port " + PORT);
});

/* ---------------Database Setup ------------*/
const DB_PORT = 27017;
const DB_URI = "mongodb://localhost:" + DB_PORT + "/wiki";
mongoose.connect(DB_URI);

//create article  schema and model
const articleSchema = new mongoose.Schema({ title: String, content: String });
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get((req, res) => {
        //find doesn't return a Promise...
        Article.find({}, (err, data) => {
            console.log(data);
            if (!err) {
                res.send(data);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        const new_art = new Article({ title: req.body.title, content: req.body.content });
        new_art.save()
            .then(() => {
                res.send("Success!");
            })
            .catch((err) => {           //use Promise catch functionality
                res.send(err);
            });
    })
    .delete((req, res) => {
        Article.deleteMany({})
            .then(() => {
                res.send("Deleted all articles");
            })
            .catch((err) => {
                res.send(err);
            });
    });

app.route("/articles/:article_name")
    .get((req, res) => {
        Article.findOne({ title: req.params.article_name }, (err, data) => {
            if (!err) {
                res.send(data);
            } else {
                res.send(err);
            }
        });
    })

    .put((req, res) => {
        Article.updateOne(
            { title: req.params.article_name },           //get title from url
            { title: req.body.title, content: req.body.content },         //update with new information,
            (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.send(err);
                }
            });
    });
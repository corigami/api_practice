
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
const articleSchema = new mongoose.Schema({title: String, content: String });
const Article = mongoose.model("Article", articleSchema);
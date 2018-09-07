// LOAD DEPENDENCIES:
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// =============================================================
// SET UP EXPRESS FUNCTIONALITY:


// SET UP EXPRESS AND PORT FUNCTIONALITY.
var app = express();
var PORT = process.env.PORT || 3000;

// LET THE CSS BE REACHED.
app.use(express.static(path.join(__dirname, './app/public')));

// Sets up the Express app to handle data parsing
// RUNS THE BODY PARSER VARIABLE AS ABLE TO RUN.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Add the application routes
// LET THE SERVER HIT THE PATHS FOR THE ROUTES.
require(path.join(__dirname, "./app/routing/apiRoutes"))
require(path.join(__dirname, "./app/routing/htmlRoutes"))

// START THE SERVER RUNNING.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
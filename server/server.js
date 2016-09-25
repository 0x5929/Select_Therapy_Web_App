//Set Up
var express = require('express'); //requiring the express module
var app = express(); //creating our application with express
var port = 8080; //set the port
//Configuration
app.use(express.static("../client")); //setting up the static file location
//listen (starting our application with node server.js)
app.listen(port);
console.log("magic happens on port: " + port);
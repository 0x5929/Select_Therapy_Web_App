//Set Up
// need to read more about express and its functions. 10/01/2016
var express = require('express'); //requiring the express module
var app = express(); //creating our application with express
var port = 8080; //set the port
//Configuration
app.use(express.static("../client")); //setting up the static file location
//listen (starting our application with node server.js)
app.listen(port);
//learn whats env port
console.log("magic happens on port: " + port);
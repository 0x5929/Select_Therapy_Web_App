(function() {
	'use strict';
//Set Up
// need to read more about express and its functions. 10/01/2016
var fs = require('fs'); 	//requiring fileSystem
var express = require('express'); 	//requiring the express module
var bodyParser = require('body-parser');	//fetching body parser
var path = require('path'); 	//requiring the path module for pdf path resolving
var nodemailer = require('nodemailer'); 	//fetching nodemailer
var app = express(); 	//creating our application with express
var port = process.env.PORT || 8080; 	//set the port
//Setting up express application
app.use(express.static("../client")); 	//setting up the static file location
app.use(bodyParser.json());	//get information from html forms
//routes, passing in all the necessary module objs
require('./routes.js')(app, fs, bodyParser, nodemailer);

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
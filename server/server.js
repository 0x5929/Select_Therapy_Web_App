(function() {
	'use strict';
//Set Up Application
// need to read more about express and its functions. 10/01/2016
//fetching all tools
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');	
var configDB = require('./config/database.js')
var app = express();
var port = process.env.PORT || 8080;

//configuration
mongoose.connect(configDB.url)
//Setting up express application
app.use(express.static("../client")); 	//setting up the static file location
app.use(bodyParser.json());	//get information from html forms

//routes, passing in all the necessary module objs
require('./routes/routes.js')(app, fs, bodyParser, nodemailer);

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
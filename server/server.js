(function() {
	'use strict';
//Set Up Application
// need to read more about express and its functions. 10/01/2016
//fetching all tools
var fs = require('fs'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	passport = require('passport'),
	//flash = require('connect-flash'),
	nodemailer = require('nodemailer'),
	
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	session = require('express-session'),

	configDB = require('./config/database.js')(mongoose);

//configuration
//database configuration

configDB.databaseConnectionConfig();
mongoose.connect(configDB.url);
require('./config/passport.js')(passport);


//Setting up express application
app.use(logger('common'));
app.use(cookieParser());
app.use(bodyParser.json());	//get information from html forms
app.use(express.static("../client")); 	//setting up the static file location

//required set up for passport sessions
app.use(session({secret: 'kevinRenIsAweseome', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());

//routes, passing in all the necessary module objs
require('./routes/routes.js')(express, app, fs, bodyParser, nodemailer, passport);

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
(function() {
	'use strict';
//Set Up Application
// need to read more about express and its functions. 10/01/2016
//fetching all tools
var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	passport = require('passport'),
	nodemailer = require('nodemailer'),
	//middleware
	errHandling = require(path.join(__dirname, '/config/errHandling.js')),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	validator = require('express-validator'),
	session = require('express-session'),
	mongoStore = require('connect-mongo')(session),
	//fetching database configuration
	configDB = require('./config/database.js')(mongoose);

//configuration
//database configuration

configDB.databaseConnectionConfig();
mongoose.connect(configDB.url);
require('./config/passport.js')(passport);


//Setting up express application
app.use(logger('dev'));
app.use(cookieParser('kevinRenIsAweseome'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));	//get information from html forms
app.use(express.static(path.join(__dirname, '/../client'))); 	//setting up the static file location
app.use(validator({
	customValidators:{	//these custom pins could be changed.
		pinVerification: function(pin, signUpAs) {
			if (pin === 'sti8')	return signUpAs = 'Admin';
			if (pin === 'sti7')	return signUpAs = 'Staff';
			if (pin === 'sti6')	return signUpAs = 'Student';
			return false;
		}
	} }));

//required set up for passport sessions
app.use(session({secret: 'kevinRenIsAweseome', 
				 saveUninitialized: false, 
				 resave: false,
				 store: new mongoStore({ mongooseConnection: mongoose.connection})}));
app.use(passport.initialize());
app.use(passport.session());

//routes, passing in all the necessary module objs
require('./routes/routes.js')(express, app, fs, bodyParser, validator, nodemailer, passport);

//error handling
app.use(errHandling);

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
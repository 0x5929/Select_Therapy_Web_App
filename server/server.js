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
	helmet = require('helmet'),
	//middleware
	errHandling = require(path.join(__dirname, 'services/errHandling.js')),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	validator = require('express-validator'),
	session = require('express-session'),
	mongoStore = require('connect-mongo')(session),
	//fetching configuration material
	configDB = require(path.join(__dirname, 'config/database.js'))(mongoose),
	configCV = require(path.join(__dirname, 'config/customValidator.js')),
	configNM = require(path.join(__dirname, 'config/nodemail.js')),
	//fetching services
	nodemailerService = require(path.join(__dirname, 'services/nodemail.js'))(nodemailer, configNM.smtpConfig);	//pass in neccessary configs

//configuration

configDB.databaseConnectionConfig();	//database configuration
mongoose.connect(configDB.url);
require('./config/passport.js')(passport);	//passport configuration


//Setting up express application middlewares
app.use(logger('dev'));
app.use(cookieParser('kevinRenIsAweseome', { httpOnly: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));	//get information from html forms
app.use(helmet());	//security helmet
app.use(express.static(path.join(__dirname, '../client'))); 	//setting up the static file location
app.use(validator({
	customValidators:{	//these custom pins could be changed.
		pinVerification: configCV.pinVerificationHandler
	}}));
//Setting up for express/passport sessions
app.use(session({name: 'server-session-cookie-id',
				 secret: 'kevinRenIsAweseome', 
				 saveUninitialized: false, 
				 resave: false,
				 store: new mongoStore({ 
				 	mongooseConnection: mongoose.connection,
				 	ttl: 1 * 24 * 60 * 60	//1day
				 	}),
				 cookie: { path: '/', httpOnly: true, secure: false , maxAge: 86400000 }	//1day
				}));
app.use(passport.initialize());
app.use(passport.session());

//routes, passing in all the necessary module objs
require('./routes/routes.js')(express, app, fs, path, bodyParser, validator, nodemailerService, passport);

//error handling
app.use(errHandling.initialErrHandler, errHandling.finalErrHandler);

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
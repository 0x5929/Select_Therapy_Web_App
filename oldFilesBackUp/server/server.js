(function() {
	'use strict';
//Set Up Application
//fetching all tools
var fs                       	  = require('fs'),
	async                         = require('async'),	//needed
	path                          = require('path'),	//needed
	express                       = require('express'),	//needed
	app                           = express(),	//needed
	port                          = process.env.PORT || 8080,	//needed
	mongoose                      = require('mongoose'),	//db
	passport                      = require('passport'),	//user authentication
	nodemailer                    = require('nodemailer'),	//email not needed
	helmet                        = require('helmet'),	//security
	csrf                          = require('csurf'),	//security
	officeGenerator               = require('officegen'),	//needed
	google						  = require('googleapis'),	//needed
	googleAuth					  = require('google-auth-library'),	//needed
	//middleware
	bodyParser                    = require('body-parser'),	//needed
	cookieParser                  = require('cookie-parser'),	//needed
	logger                        = require('morgan'),	//needed
	validator                     = require('express-validator'),	//needed?
	session                       = require('express-session'),	//needed
	mongoStore                    = require('connect-mongo')(session),	//needed for db
	errHandling                   = require(path.join(__dirname, 'services/errHandling.js')),	//needed for express routes
	csrfTokenMiddleware           = require(path.join(__dirname, 'services/csrfToken.js')),	//needed for security
	
	//fetching configuration material
	configDB                      = require(path.join(__dirname, 'config/database.js'))(mongoose, path),
	configCV                      = require(path.join(__dirname, 'config/customValidator.js')),
	configNM                      = require(path.join(__dirname, 'config/nodemail.js')),	//not needed
	configOG                      = require(path.join(__dirname, 'config/officegen.js'))(officeGenerator),
	//fetching services
	nodemailerService             = require(path.join(__dirname, 'services/nodemail.js'))(nodemailer, configNM.smntpConfig),	// not needed for admin app pass in neccessary configs
	googleSheetService 			  = require(path.join(__dirname, 'services/googleSheet.js'))(google, googleAuth, async),	//pass in neccessary google stuff
	officeGenDocxServiceConstruct = require(path.join(__dirname, 'services/officeGenDocx.js')),
	signInSheetGenerateService    = require(path.join(__dirname, 'services/signInSheetGen.js')),
	contactListGenerateService    = require(path.join(__dirname, 'services/contactListGen.js')),
	adminFolderGenService    	  = require(path.join(__dirname, 'services/adminFolderDocGen.js'));	//not needed
//configuration

configDB.databaseConnectionConfig();	//database configuration
mongoose.connect(configDB.url);
require(path.join(__dirname, '/config/passport.js'))(passport, path);	//passport configuration


//Setting up express application middlewares
app.use(logger('dev'));
app.use(cookieParser('kevinRenIsAweseome', { httpOnly: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));	//get information from html forms
app.use(helmet());	//security helmet
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
app.use(csrf({ cookie: true }));	//security csrf setting through cookie to angular
app.use('/', express.static(path.join(__dirname, '../client'))); 	//setting up the static file location

//routes, passing in all the necessary module objects and also the office generator config for the construction of document obj in routes
require(path.join(__dirname, '/routes/routes.js'))(express, app, fs, path, bodyParser, validator, nodemailerService, passport, 
													csrfTokenMiddleware, officeGenDocxServiceConstruct, configOG, 
													signInSheetGenerateService, contactListGenerateService, adminFolderGenService, googleSheetService);

//error handling
app.use(csrfTokenMiddleware.invalidCsrfTokenErr);	//invalid csrf token err
app.use(errHandling.initialErrHandler, errHandling.finalErrHandler);	//everything else

//firing this baby up
app.listen(port, console.log('magic happens on port: ', port));

}());
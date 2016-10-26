(function() {

	'use strict';

	module.exports = function(express, app, fs, bodyParser, nodemailer, passport) {	//exposing this file to server, all necessary objs passed in
		//fetching all routers with its configueration from their seperate file modules
		var contactUsMessageRouter = require('./sendMessage/sendMessage.js')(express, app, bodyParser, nodemailer);
		var aboutUsDownloadRouter = require('./aboutUsPDFDownload/aboutUsPDFDownload.js')(express, fs);
		var signUpRouter = require('./signUp/signUp.js')(express, passport);
		var loginRouter = require('./login/login.js')(express, passport);
		var catchAllRouter = require('./catchAll/catchAll.js')(express);
		//application needs to call/hookup all the routers using the 'use' method with router starting route as first parameter, and router with its configs as second
		//set up all routes with necessary routers. 
		app.use('/sendMessage/', contactUsMessageRouter);
		app.use('/About/', aboutUsDownloadRouter);
		app.use('/signUp/', signUpRouter);
		app.use('/login/', loginRouter);
		app.use('*', catchAllRouter);
		//below needs to be encapsulated in its own module
		app.post('/signin', passport.authenticate('local-signin', {
			successRedirect: '/english',	//redirects back to home page in english, should be something like a /profile page, needs to be created
			failureRedirect: '/signin',	//redirects to sign up page if error
			failureFlash: true	//allow flash messages
		}));
	};
}());
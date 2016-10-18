(function() {

	'use strict';

	module.exports = function(express, app, fs, bodyParser, nodemailer, passport) {	//exposing this file to server, all necessary objs passed in

		var contactUsMessageRouter = require('./sendMessage/sendMessage.js')(express, app, bodyParser, nodemailer);
		var aboutUsDownloadRouter = require('./aboutUsPDFDownload/aboutUsPDFDownload.js')(express, fs);
		var signUpRouter = require('./signUp/signUp.js')(express, passport);
		app.use('/sendMessage/', contactUsMessageRouter);
		app.use('/About/', aboutUsDownloadRouter);
		app.use('/signUp/', signUpRouter);
		//below needs to be encapsulated in its own module
		app.post('/signin', passport.authenticate('local-signin', {
			successRedirect: '/english',	//redirects back to home page in english, should be something like a /profile page, needs to be created
			failureRedirect: '/signin',	//redirects to sign up page if error
			failureFlash: true	//allow flash messages
		}));
	};
}());
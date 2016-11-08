(function() {

	'use strict';

	module.exports = function(express, app, fs, bodyParser, validator, nodemailer, passport) {	//exposing this file to server, all necessary objs passed in
		//fetching all routers with its configueration from their seperate file modules
		var contactUsMessageRouter = require('./sendMessage/sendMessage.js')(express, app, bodyParser, nodemailer);
		var aboutUsDownloadRouter = require('./aboutUsPDFDownload/aboutUsPDFDownload.js')(express, fs);
		var signUpRouter = require('./signUp/signUp.js')(express, validator, passport);
		var loginRouter = require('./login/login.js')(express, passport);
		var signOutRouter = require('./signOut/signOut.js')(express);
		var checkLoggedInRouter = require('./checkLoggedIn/checkLoggedIn.js')(express);
		var catchAllRouter = require('./catchAll/catchAll.js')(express);
		//application needs to call/hookup all the routers using the 'use' method with router starting route as first parameter, and router with its configs as second
		//set up all routes with necessary routers. 
		app.use('/sendMessage/', contactUsMessageRouter);
		app.use('/About/', aboutUsDownloadRouter);
		app.use('/signUp/', signUpRouter);
		app.use('/login/', loginRouter);
		app.use('/signOut/', signOutRouter);
		app.use('/checkLoggedIn/', checkLoggedInRouter);
		app.use('*', catchAllRouter);

	};
}());
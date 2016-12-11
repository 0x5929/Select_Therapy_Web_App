(function() {

	'use strict';

	module.exports = routeHandler;

	function routeHandler(express, app, fs, path, bodyParser, validator, nodemailerService, passport, csrfTokenMiddleware) {	//exposing this file to server, all necessary objs passed in
		//fetching all routers with its configueration from their seperate file modules
		var contactUsMessageRouter = require(path.join(__dirname, 'sendMessage/sendMessage.js'))(express, app, bodyParser, nodemailerService);
		var aboutUsDownloadRouter = require(path.join(__dirname, 'aboutUsPDFDownload/aboutUsPDFDownload.js'))(express, fs);
		var promoEmailRouter = require(path.join(__dirname, 'promoEmail/promoEmail.js'))(express, validator);
		var signUpRouter = require(path.join(__dirname, 'signUp/signUp.js'))(express, validator, passport);
		var loginRouter = require(path.join(__dirname, 'login/login.js'))(express, passport);
		var signOutRouter = require(path.join(__dirname, 'signOut/signOut.js'))(express);
		var checkLoggedInRouter = require(path.join(__dirname, 'checkLoggedIn/checkLoggedIn.js'))(express);
		var csrfTokenRequestRouter = require(path.join(__dirname, 'csrfTokenRequest/csrfTokenRequest.js'))(express, csrfTokenMiddleware);
		var catchAllRouter = require(path.join(__dirname, 'catchAll/catchAll.js'))(express);
		//application needs to call/hookup all the routers using the 'use' method with router starting route as first parameter, and router with its configs as second
		//set up all routes with necessary routers. 

		app.use('/sendMessage/', contactUsMessageRouter);
		app.use('/About/', aboutUsDownloadRouter);
		app.use('/promoEmail/', promoEmailRouter);
		app.use('/signUp/', signUpRouter);
		app.use('/login/', loginRouter);
		app.use('/signOut/', signOutRouter);
		app.use('/checkLoggedIn/', checkLoggedInRouter);
		app.use('/csrfToken/', csrfTokenRequestRouter);
		app.use('*', catchAllRouter);

	};
}());
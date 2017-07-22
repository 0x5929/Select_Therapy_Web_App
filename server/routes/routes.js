(function() {

	'use strict';

	module.exports = routeHandler;

	function routeHandler(express, app, path, bodyParser, validator,  passport, 
	csrfTokenMiddleware, officeGenDocxConstruct, OGconfig, signInSheetService, contactListService, googleSheetService) {	//exposing this file to server, all necessary objs passed in
		//fetching all routers with its configueration from their seperate file modules
		var adminRouter = require(path.join(__dirname, 'adminRouter/adminRouter.js'))(express, app, path, bodyParser, 
											officeGenDocxConstruct, OGconfig, signInSheetService, contactListService, googleSheetService);
		var signUpRouter = require(path.join(__dirname, 'signUp/signUp.js'))(express, validator, passport);
		var loginRouter = require(path.join(__dirname, 'login/login.js'))(express, passport);
		var signOutRouter = require(path.join(__dirname, 'signOut/signOut.js'))(express);
		var checkLoggedInRouter = require(path.join(__dirname, 'checkLoggedIn/checkLoggedIn.js'))(express);
		var csrfTokenRequestRouter = require(path.join(__dirname, 'csrfTokenRequest/csrfTokenRequest.js'))(express, csrfTokenMiddleware);
		//application needs to call/hookup all the routers using the 'use' method with router starting route as first parameter, and router with its configs as second
		//set up all routes with necessary routers. 

		app.use('/admin/', adminRouter);
		app.use('/signUp/', signUpRouter);
		app.use('/login/', loginRouter);
		app.use('/signOut/', signOutRouter);
		app.use('/checkLoggedIn/', checkLoggedInRouter);
		app.use('/csrfToken/', csrfTokenRequestRouter);

	};
}());
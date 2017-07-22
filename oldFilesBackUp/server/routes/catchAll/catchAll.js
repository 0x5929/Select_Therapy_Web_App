(function() {	//this module needs to be re-evaluated and removed	//or changed into a page displaying 404 not found
	'use strict';
	var path = require('path');
	module.exports = catchAllRouteHandler;

	function catchAllRouteHandler(express) {
		//initialize router
		var catchAllRoute = express.Router();
		//config routes for router
		catchAllRoute.all('*', function(req, res, next) {
			res.sendFile('index.html', {root : path.resolve(__dirname + '/../../../client/')});
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return catchAllRoute;
	};
}());
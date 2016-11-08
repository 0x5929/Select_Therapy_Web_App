(function() {
	'use strict';
	var path = require('path');
	module.exports = function(express) {
		//initialize router
		var catchAllRoute = express.Router();
		//config routes for router
		catchAllRoute.all('*', function(req, res) {
			res.sendFile('index.html', {root : path.resolve(__dirname + '/../../../client/')});
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return catchAllRoute;
	};
}());
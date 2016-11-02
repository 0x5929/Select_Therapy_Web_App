(function() {
	'use strict';
	module.exports = function(express) {
		//initialize router
		var signOutRoute = express.Router();
	
		signOutRoute.post('/', function(req, res) {
			req.logOut();
			res.status(200);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signOutRoute;
	};
}());
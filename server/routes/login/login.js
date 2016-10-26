(function() {
	'use strict';
		module.exports = function(express, passport) {
		//initialize router
		var loginRoute = express.Router();
		//config routes for router
		loginRoute.post('/', passport.authenticate('local-signin'), function(req, res) {
			res.send(req.user);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return loginRoute;
	};
}());
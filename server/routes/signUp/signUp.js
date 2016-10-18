(function() {
	'use strict';

	module.exports = function(express, passport) {
		//initialize router
		var signUpRoute = express.Router();
		//config routes for router
		signUpRoute.post('/', passport.authenticate('local-signup'), function(req, res) {
			res.json({'message': 'hello world'});
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signUpRoute;
	};
}());
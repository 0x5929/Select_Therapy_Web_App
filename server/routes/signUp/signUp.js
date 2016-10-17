(function() {
	'use strict';

	module.exports = function(express, passport) {

		var signUpRoute = express.Router();
		signUpRoute.post('/', passport.authenticate('local-signup'));
		return signUpRoute;
	};
}());
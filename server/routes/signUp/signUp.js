(function() {
	'use strict';

	module.exports = function(express, passport) {

		var signUpRoute = express.Router();
		signUpRoute.post('/', passport.authenticate('local-signup'), function(req, res) {
			res.json({'message': 'hello world'});
		});
		return signUpRoute;
	};
}());
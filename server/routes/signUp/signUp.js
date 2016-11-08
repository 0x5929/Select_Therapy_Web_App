(function() {
	'use strict';

	module.exports = function(express, validator, passport) {
		//initialize router
		var signUpRoute = express.Router();
		//config routes for router
		signUpRoute.post('/', function(req, res, next) {

			req.check('email', 'Invalid email address!').isEmail();
			var errors = req.validationErrors();
			console.log('ERRORS');
			console.log('=============');
			console.log(errors);
			if (errors) res.status(400).send(errors);
			else {
				passport.authenticate('local-signup', function(err, user, info) {
					if (err)
						return next(err);
					if (!user)
						return res.status(400).send(info.message);
					req.logIn(user, function(err) {
						if (err)
							return next(err);
						return res.status(200).send(req.user);
					});
				})(req, res, next);
			}
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signUpRoute;
	};
}());

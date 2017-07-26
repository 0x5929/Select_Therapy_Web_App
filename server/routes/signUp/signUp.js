(function() {
	'use strict';

	module.exports = signUpHandler;

	function signUpHandler(express, validator, passport) {
		//initialize router
		var signUpRoute = express.Router();

		//config routes for router
		signUpRoute.post('/', function(req, res, next) {
			var errors;
			//	first we check for errors of misvalidation
			req.check('email', 'Invalid email address!').isEmail();
			req.check('password', 'Oops, password is not at least 6 charatacters long, please try again!').isLength({min: 6});
			req.check('password', 'Oops, passwords are not matching, please try again!').equals(req.body.confirmPassword);
			errors = req.validationErrors();
			if (errors) {
				var errMsg = errors.map(function(err) {
					return err.msg;
				});
				console.log(errMsg);
				res.status(400).send(errMsg);
			}else	return next();
		}, 
		function(req, res, next) {	

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
				})(req);	//passing in req object for passport
			
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signUpRoute;
	};
}());

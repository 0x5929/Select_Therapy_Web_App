(function() {
	'use strict';
		module.exports = function(express, passport) {
		//initialize router
		var loginRoute = express.Router();
		//config routes for router
		//loginRoute.post('/', passport.authenticate('local-signin'), function(req, res) {
		//	res.send(req.user);
		//});
		loginRoute.post('/', function(req, res, next) {
			passport.authenticate('local-signin', function(err, user, info) {
				if (err)
					return next(err);
				if (!user)
					return res.status(401).send(info.message);
				req.logIn(user, function(err) {
					if (err)
						return next(err);
					return res.send(req.user);
				});
			})(req, res, next);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return loginRoute;
	};
}());


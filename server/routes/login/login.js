(function() {
	'use strict';

		module.exports = loginHandler;

		function loginHandler(express, passport) {
			//initialize router
			var loginRoute = express.Router();

			loginRoute.post('/', function(req, res, next) {
				var cookieValue,
				cookieOption;

				if (req.body.remember) {	//need to not send password to client because its dangerous to store senstive info in cookie to be seen
					cookieValue = JSON.stringify({ email: req.body.email, pw: req.body.password });
					cookieOption = { httpOnly : false, expires: new Date(Date.now() + 1210000000) };	//2 weeks expiration for cookie
					res.cookie('rememberMeCookie', cookieValue, cookieOption);
					return next();
				}else	return next();
			}, 
			function(req, res, next) {

				passport.authenticate('local-signin', function(err, user, info) {
					if (err)
						return next(err);
					if (!user)
						return res.status(400).send(info.message);
					req.logIn(user, function(err) {
						if (err)
							return next(err);
						return res.status(200).send(req.user);
					});
				})(req);	//passing in request object for passport
			});
			//expose router and all of its configed routes back to routesjs to be used in serverjs
			return loginRoute;
	};
}());


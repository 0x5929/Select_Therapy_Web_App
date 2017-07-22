(function() {
	'use strict';
	module.exports = signOutHandler;

	function signOutHandler(express) {
		//initialize router
		var signOutRoute = express.Router();
	
		signOutRoute.get('/', function(req, res, next) {
			req.logOut();
			return res.status(200).send('hello world from signOutRoute from server');
			
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signOutRoute;
	};
}());
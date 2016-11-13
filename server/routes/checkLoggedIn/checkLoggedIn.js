(function() {
	'use strict';

	module.exports = checkLoggedInHandler;

	function checkLoggedInHandler(express) {
		//initialize router
		var checkLoggedInRoute = express.Router();
	
		checkLoggedInRoute.get('/', function(req, res, next) {	
			var loggedIn = req.user;
			//if req.user exists, meaning there is session, send client user
			if (loggedIn) return res.status(200).send(req.user);
			//or else, send status code 401 for unauthorization
			else return res.status(401);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return checkLoggedInRoute;
	};
}());
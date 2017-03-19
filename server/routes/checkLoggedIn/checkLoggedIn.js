(function() {
	'use strict';

	module.exports = checkLoggedInHandler;

	function checkLoggedInHandler(express) {
		//initialize router
		var checkLoggedInRoute = express.Router();
	
		checkLoggedInRoute.get('/', function(req, res, next) {	
			var loggedIn = req.user;
			//if req.user exists, meaning there is session, send client user
			if (loggedIn){
				console.log('this should be a user session: ');
				console.log(req.session);
				return res.status(200).send(req.user).end();
			}
			//or else, send status code 401 for unauthorization
			else {
				req.session.destroy();	//clears any server session if no user is logged in
				console.log('should be no session: ');
				console.log(req.session);
				return res.status(401).end();
			}
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return checkLoggedInRoute;
	};
}());
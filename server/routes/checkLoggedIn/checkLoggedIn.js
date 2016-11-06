(function() {
	'use strict';

	module.exports = function(express) {
		//initialize router
		var checkLoggedInRoute = express.Router();
	
		checkLoggedInRoute.get('/', function(req, res) {	//trying another approach where we send to client the req.user, this way if its undefined because session has ended, the client can act accordingly
			/*
			if (!req.session) {	//need to check cookie instead of session, because session is restarted every refresh
				//let client know there aint no session going on, so plan A: need to sign in to view auth pages
				res.status(500).send('nope, not logged in');
			}
			else {
				//let client know there is session going on, so plan B: tell client to populate $rootScope.currentUser b/c user is logged in.
				console.log('hello world: ', req.session);
				res.status(200).send('okay we are logged in');
			}
			*/
			console.log(req.user);
			console.log('==================');
			console.log(req.session);
			res.status(200).send(req.user);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return checkLoggedInRoute;
	};
}());
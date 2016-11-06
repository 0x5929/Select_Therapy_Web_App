(function() {
	'use strict';

	module.exports = function(express) {
		//initialize router
		var checkLoggedInRoute = express.Router();
	
		checkLoggedInRoute.get('/', function(req, res) {
			if (!req.session) {
				//let client know there aint no session going on, so plan A: need to sign in to view auth pages
				res.status(500).send('nope, not logged in');
			}
			else {
				//let client know there is session going on, so plan B: tell client to populate $rootScope.currentUser b/c user is logged in.
				console.log('hello world: ', req.session);
				res.status(200).send('okay we are logged in');
			}
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return checkLoggedInRoute;
	};
}());
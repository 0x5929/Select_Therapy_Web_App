(function() {
	'use strict';
	module.exports = function(express) {
		//initialize router
		var signOutRoute = express.Router();
	
		signOutRoute.get('/', function(req, res) {
			req.session.destroy();
			console.log('req.session should be destroyed: ', req.session);
			req.logOut();
			res.status(200).send('hello world from signoutRoute bitch');
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signOutRoute;
	};
}());
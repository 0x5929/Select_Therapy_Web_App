(function() {
	'use strict';
	module.exports = function(express) {
		//initialize router
		var signOutRoute = express.Router();
	
		signOutRoute.get('/', function(req, res) {
			/*
			req.session.destory(function(err) {
				req.logout();
				res.clearCookie('connect.sid');	//clears cookie as you sign out
				res.status(200).send('hello world from signoutRoute bitch');
			});
			*/
			req.logOut();
			res.status(200).send('hello world from signOutRoute');
			
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return signOutRoute;
	};
}());
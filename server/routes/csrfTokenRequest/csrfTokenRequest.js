(function() {
	'use strict';
	module.exports = csrfTokenRequestHandler;

	function csrfTokenRequestHandler(express, csrfTokenMiddleware) {
		//initialize router
		var csrfTokenRequestRoute = express.Router();

		csrfTokenRequestRoute.get('/', csrfTokenMiddleware.csrfTokenAssignment, function(req, res, next) {
			return res.status(200).send('csrfNowProtected').end();
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return csrfTokenRequestRoute;
	}

}());
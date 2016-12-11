(function() {
	'use strict';
	module.exports = promoEmailHandler;

	function promoEmailHandler(express, validator) {
		//initialize router
		var promoEmailRoute = express.Router();
	
		promoEmailRoute.post('/', function(req, res, next) {
			var error;
			req.check('promoEmail', 'Please enter a valid E-mail Address!!').isEmail();
			error = req.validationErrors();
			console.log(error);
			if (error)	res.status(400).send(error[0].msg);	//first and only error message
			else	return next();
		}, function(req, res, next) {
			//store email in database
			res.status(200);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return promoEmailRoute;
	};
}());
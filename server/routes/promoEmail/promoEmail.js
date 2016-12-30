(function() {
	'use strict';

	module.exports = promoEmailHandler;

	function promoEmailHandler(express, app, validator, bodyParser, path) {
		//initialize router
		var promoEmailRoute = express.Router();

		//set up all needed tools
		var promoEmailDbModel = require(path.join(__dirname, '../../models/promoOffer.js'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
	
		promoEmailRoute.post('/', function(req, res, next) {	//err checking middleware
			var error;
			req.check('promoEmail', 'Please enter a valid E-mail Address!!').isEmail();
			error = req.validationErrors();
			if (error)	res.status(400).send(error[0].msg);	//first and only error message
			else	return next();
		}, function(req, res, next) {
			//store email in database
			var newEmail = new promoEmailDbModel();
			newEmail.email = req.body.promoEmail;	//saving request body's email into db
			newEmail.save(function(err) {
				if (err) next(err);
			});
			return res.sendStatus(200);	
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return promoEmailRoute;
	};
}());
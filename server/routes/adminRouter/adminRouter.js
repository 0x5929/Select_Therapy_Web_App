(function() {
	'use strict';
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//mainm Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.post('/add', adminAddPostParseMiddleware, adminAddPostHandler);
		
		//handler and middleware functions used in routes
		function adminSearchGetHandler(req, res, next) {
			var searchParameter = req.query.parameter;
			var searchInput = req.query.input;
			console.log(searchParameter);
			console.log(searchInput);

			if (!searchInput || !searchParameter)
				return res.status(400).send('invalid entry');
			if (searchParameter === 'Name') {
				STIDbStudentCollection.findOne({'name': searchInput}, function(err, user) {
					console.log(err);
					console.log(user);
					if (err) return next(err);
					if (user) return res.send(user);
					if (!user) return res.send('nope no user here');
				});
			}else if (searchParameter === 'email') {
					STIDbStudentCollection.findOne({'email': searchInput}, function(err, user) {
					if (err) return next(err);
					if (user) return res.send(user);
					if (!user) return res.send('nope no user here');
				});
			}else if (searchParameter === 'Phone number'){
					STIDbStudentCollection.findOne({'phone_number': searchInput}, function(err, user) {
					if (err) return next(err);
					if (user) return res.send(user);
					if (!user) return res.send('nope no user here');
				});
			}
		}

		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody = req.body;
			console.log('hello world');
			console.log(requestBody);
			//parse all neccessary fields to be correctly input into db
			requestBody.phoneNumber = Number(requestBody.phoneNumber);
			requestBody.payRate = Number(requestBody.payRate);
			requestBody.graduate = Boolean(requestBody.graduate);
			requestBody.tuitionPaid = Boolean(requestBody.tuitionPaid);
			requestBody.jobPlaced = Boolean(requestBody.jobPlaced);
			requestBody.fullTimePos = Boolean(requestBody.fullTimePos);
			requestBody.partTimePos = Boolean(requestBody.partTimePos);
			requestBody.passedExam = Boolean(requestBody.passedExam);
			requestBody.passedOn1st = Boolean(requestBody.passedOn1st);
			requestBody.passedOn2nd = Boolean(requestBody.passedOn2nd);
			requestBody.passedOn3rd = Boolean(requestBody.passedOn3rd);
			
			console.log(requestBody);	//check again
			//calling next to further handle request
			next();
		}

		function adminAddPostHandler(req, res, next) {
			res.status(200).send('signal recieved');
		}

		return adminRoute;
	}
}());
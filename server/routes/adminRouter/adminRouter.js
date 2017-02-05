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
		adminRoute.put('/modify', adminModifyPutHandler);
		
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
					if (!user) return res.status(400).send('nope no user here');
				});
			}else if (searchParameter === 'email') {
					STIDbStudentCollection.findOne({'email': searchInput}, function(err, user) {
					if (err) return next(err);
					if (user) return res.send(user);
					if (!user) return res.status(400).send('nope no user here');
				});
			}else if (searchParameter === 'Phone number'){
					STIDbStudentCollection.findOne({'phoneNumber': searchInput}, function(err, user) {
					if (err) return next(err);
					if (user) return res.send(user);
					if (!user) return res.status(400).send('nope no user here');
				});
			}
		}

		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody = req.body;
			//parse all neccessary fields to be correctly input into db
			requestBody.phoneNumber = Number(requestBody.phoneNumber);
			requestBody.ssn = Number(requestBody.ssn);
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
			//calling next to further handle request
			next();
		}

		function adminAddPostHandler(req, res, next) {
			console.log(req.body);
			STIDbStudentCollection.findOne({'name': req.body.name}, function(err, user) {
				if (err) return next(err);
				if (user) return res.status(400).send('This user already exists!');
				if (!user) {	//if no user, then save all the creditials from client side
					var newStudent = new STIDbStudentCollection();
					newStudent.name = req.body.name;
					newStudent.phoneNumber = req.body.phoneNumber;
					newStudent.ssn = req.body.ssn;
					newStudent.address = req.body.address;
					newStudent.email = req.body.email;
					newStudent.program = req.body.program;
					newStudent.graduate = req.body.graduate;
					newStudent.tuitionPaid = req.body.tuitionPaid;
					newStudent.jobPlaced = req.body.jobPlaced;
					newStudent.fullTimePos = req.body.fullTimePos;
					newStudent.partTimePos = req.body.partTimePos;
					newStudent.payRate = req.body.payRate;
					newStudent.jobDescription = req.body.jobDescription;
					newStudent.noJobReason = req.body.noJobReason;
					newStudent.passedExam = req.body.passedExam;
					newStudent.passedOn1st = req.body.passedOn1st;
					newStudent.passedOn2nd = req.body.passedOn2nd;
					newStudent.passedOn3rd = req.body.passedOn3rd;
					//save the new student
					newStudent.save(function(err) {
						if (err) return next(err);
					});
				}
			})
			return res.status(200).send('newStudent added');
		}

		function adminModifyPutHandler(req, res, next) {
			var requestBody = req.body;
			var modifyingKeys = Object.keys(requestBody);
			STIDbStudentCollection.findOne({'name': requestBody.originalName}, function(err, user) {
				if (err) return next(err);
				if (!user) return res.status(500).send("Database or Client side err, cannot find the user's originalName in db");
				if (user) {
					modifyingKeys.forEach(function(key) {
						if (key === "originalName") return;	//skipping the original name key
						user[key] = requestBody[key];	//updating the keys
						user.save(function(err, updatedUser) {
							if (err) return next(err);
						});
					});

					return res.status(200).send('updatedUser');			
				}
			});
		}

		return adminRoute;
	}
}());
(function() {
	'use strict';
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser) {
		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.post('/add', adminAddPostHandler);
		
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

		function adminAddPostHandler(req, res, next) {
			var requestBody = req.body;
			console.log('hello world');
			console.log(requestBody);
		}

		return adminRoute;
	}
}());
(function() {
	'use strict';
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser) {
		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		adminRoute.post('/', adminSearchPostHandler);
		
		function adminSearchPostHandler(req, res, next) {

			var requestData = req.body;
			var searchParameter = requestData.parameter;
			var searchInput = requestData.input;
			console.log(requestData);
			console.log(searchParameter);
			console.log(searchInput);
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

		return adminRoute
	}
}());
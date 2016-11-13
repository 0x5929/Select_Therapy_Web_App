(function() {	//	this module can be improved for better encapsulation
	'use strict';
	
	module.exports = sendMessageRouteHandler;

	function sendMessageRouteHandler(express, app, bodyParser, nodemailerService) {
		//initialize router
		var sendMessageRoute = express.Router();
		//set up all needed tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		//config routes for router
		sendMessageRoute.post('/', function(req, res, next) {
			var requestData = req.body;	//grabing the data, made possible by bodyParser
			//mail context 
			var mailData = {
				from: '"Select Thearpy Institute Message Inquiry" <work.kevin.ren@gmail.com>',
				to: 'selecttherapyinstitute@gmail.com',
				subject: 'Inquiry message from ' + requestData.name + ', with the return address of: ' + requestData.email + '.',
				text: requestData.message
			};
			nodemailerService.contactUsMessengerHandler(mailData);
			next();
		}, 
		function(req, res, next) {
			res.send(req.body);	//needs to be inproved.. front end doesnt do anything with this response data doe..
			res.end();	//ends the signal

		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return sendMessageRoute;
		};

}());
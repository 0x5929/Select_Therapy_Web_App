(function() {
	'use strict';
	
	module.exports = function(express, app, bodyParser, nodemailer) {
		//initialize router
		var sendMessageRoute = express.Router();
		//set up all needed tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		//config routes for router
		sendMessageRoute.post('/', function(req, res) {
			// the smtp configuration used for the nodemailer's transport to create transporter object 
			var smtpConfig = {
		    host: 'smtp.gmail.com',
		    port: 465,
		    secure: true, // use SSL
		    auth: {
		        user: 'work.kevin.ren@gmail.com',
		        pass: 'jordan45'
		    	}
			};
			var transporter = nodemailer.createTransport(smtpConfig);	//initializes the transportor 
			var requestData = req.body;	//grabing the data, made possible by bodyParser
			//mail context 
			var mailData = {
				from: '"Select Thearpy Institute Message Inquiry" <work.kevin.ren@gmail.com>',
				to: 'selecttherapyinstitute@gmail.com',
				subject: 'Inquiry message from ' + requestData.name + ', with the return address of: ' + requestData.email + '.',
				text: requestData.message
			};
			//sending the mail
			transporter.sendMail(mailData, function(err, info) {
				if(err)
					return console.log(err);
				console.log(info.response);  //delivery success test, logs some werid response property of the info obj, has headers with gmailsmtp

			});
			res.json(requestData);	//needs to be inproved.. front end doesnt do anything with this response data doe..
			res.end();	//ends the signal

		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return sendMessageRoute;
		};

}());
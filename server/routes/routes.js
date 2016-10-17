(function() {

	'use strict';

	module.exports = function(express, app, fs, bodyParser, nodemailer, passport) {	//exposing this file to server, all necessary objs passed in

		var contactUsMessageRouter = require('./sendMessage/sendMessage.js')(express, app, bodyParser, nodemailer);
		var aboutUsDownloadRouter = require('./aboutUsPDFDownload/aboutUsPDFDownload.js')(express, fs);
		var signUpRouter = require('./signUp/signUp.js')(express, passport);
		app.use('/sendMessage/', contactUsMessageRouter);
		app.use('/About/', aboutUsDownloadRouter);
		app.use('/signUp/', signUpRouter);

		/*
		app.get('/About/:id', function(req, res) {	//listens for signal GET repquests for paths start with /about/PdfID/
			var id = req.params.id; 	//grabbing the ID parameter
			console.log(id);	//signal test Terminal logs: School_Catalog
			var filename = __dirname + '/../../client/app/About/' + id + '/' + id + '.pdf';		//creates the file name
			var PDFReadstream = fs.createReadStream(filename);	//create a read stream for the file
			res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');	//setting the header, content disposition, and open new tab option with inline, or download option with attachment
			res.setHeader('Content-type', 'application/pdf');	//setting the content type to header
			//use the read stream created by fs and pipe through the write stream object in response read stream obj,
			// which sends(writes) the actually data to client to be rendered. 
			PDFReadstream.pipe(res);
		});
		*/
		/*
		app.post('/sendMessage', function(req, res) {	//port listening to POST signal from client with http://localhost:8080/sendMessage
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
		*/
		/*
		app.post('/signUp', passport.authenticate('local-signup', {
			successRedirect: '/english',	//redirects back to home page in english, should be something like a /profile page, needs to be created
			failureRedirect: '/signup',	//redirects to sign up page if error
			failureFlash: true	//allow flash messages
		}));
		*/
		app.post('/signin', passport.authenticate('local-signin', {
			successRedirect: '/english',	//redirects back to home page in english, should be something like a /profile page, needs to be created
			failureRedirect: '/signin',	//redirects to sign up page if error
			failureFlash: true	//allow flash messages
		}));
	};
}());
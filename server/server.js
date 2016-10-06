(function() {
	'use strict';
//Set Up
// need to read more about express and its functions. 10/01/2016
var fs = require('fs'); //requiring fileSystem
var express = require('express'); //requiring the express module
var bodyParser = require('body-parser');//fetching body parser
var path = require('path'); //requiring the path module for pdf path resolving
var nodemailer = require('nodemailer'); //fetching nodemailer
var transporter = nodemailer.createTransport();//initializes the transport
var app = express(); //creating our application with express
var port = process.env.PORT || 8080; //set the port
//Configuration
app.use(express.static("../client")); //setting up the static file location
app.use(bodyParser.json());//configuring body parser to parse incoming application/json files
//GET REQUESTS FOR PDF FILES
//listens for signal GET repquests for paths start with /about/PdfID/
app.get('/About/:id', function(req, res) {
	var id = req.params.id; //grabbing the ID, ie: School_Catalog
	console.log(id);//Terminal logs: School_Catalog
	console.log(req.url);//Terminal logs: /About/Annual_Report
	//creates the file name
	var filename = __dirname + '/../client/app/About/' + id + '/' + id + '.pdf';
	//create a read stream for the file
	var PDFReadstream = fs.createReadStream(filename);
	//settting the header, content disposition, and open new tab option with inline, or download option with attachment
	res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
	//setting the content type to header
	res.setHeader('Content-type', 'application/pdf');
	//use the read stream created by fs and pipe it through the write stream object in response,
	// which sends(writes) the actually data to client to be rendered. 
	PDFReadstream.pipe(res);
	/*
	//another way? but above works so this is commented out
	fs.readFile(__dirname + '../client/app/About/School_Catalog/School_Catalog.pdf', function(err, data) {
		if (err)
			res.json({'status':'error', msg:err});
		else{
		 	res.setHeader('content-type', 'application/pdf');
		 	res.send(data);
		}
	});*/
});
app.post('/sendMessage', function(req, res) {
	var requestData = req.body;
	console.log(req.body);
	var mailData = {
		from: 'work.kevin.ren@gmail.com',
		to: 'selecttherapyinstitute@gmail.com',
		subject: 'Message from ' + requestData.fullName + ' with return address of: ' + requestData.emailAddress,
		text: requestData.message
};
	transporter.sendMail(mailData);
	res.json(requestData);
	
});
//listen (starting our application with node server.js)
app.listen(port, console.log('magic happens on port: ', port));
}());
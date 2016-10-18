(function() {
	'use strict';
//remember to see and check how to configure a password for the database
	
	module.exports = function(mongoose){
	var url = 'mongodb://localhost/users/';
	var databaseConnectionConfig = function() {
		mongoose.Promise = global.Promise;	//setting the mongoose promise lib to global because mongoose promise lib is depracated
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error: '));
		db.once('open', function() {
  		// Create your schemas and models here.
  		//defining schema for our user model: for mongoose
		var Users = require('../models/users.js');	//loading all models
		
		});
	};
	
	return {
		url : url,
		databaseConnectionConfig : databaseConnectionConfig
		};

	};
	

	//module.exports = {url: 'mongodb://localhost/users/'};
}());
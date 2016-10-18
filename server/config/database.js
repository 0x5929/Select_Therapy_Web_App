(function() {
	'use strict';

	module.exports = function(mongoose){
	var url = 'mongodb://localhost/users/';
	var databaseConnectionConfig = function() {
		mongoose.Promise = global.Promise;	//setting the mongoose promise lib to global because mongoose promise lib is depracated
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error: '));
		db.once('open', function() {
  		//loading all models with schema defined already in their respective model page
		var Users = require('../models/users.js');	
		});
	};
	//exposing url and connectionConfiguration for server methods
	return {
		url : url,
		databaseConnectionConfig : databaseConnectionConfig
		};

	};
	
}());
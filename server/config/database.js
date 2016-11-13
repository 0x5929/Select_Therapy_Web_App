(function() {
	'use strict';

	module.exports = databaseConfigHandler;

	function databaseConfigHandler(mongoose){

		var services = {
			url : 'mongodb://localhost/users/',
			databaseConnectionConfig : databaseConnectionConfig
		};

	
		function databaseConnectionConfig() {
			mongoose.Promise = global.Promise;	//setting the mongoose promise lib to global because mongoose promise lib is depracated
			var db = mongoose.connection;
		
			db.on('error', console.error.bind(console, 'connection error: '));
			db.once('open', function() {
  			//loading all models with schema defined already in their respective model page
			var Users = require('../models/users.js');	
			});
		}
		//exposing services
		return services;

	};
	
}());
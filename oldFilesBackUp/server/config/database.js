(function() {
	'use strict';

	module.exports = databaseConfigHandler;

	function databaseConfigHandler(mongoose, path){

		var services = {
			url : 'mongodb://kevinren:jordan45@ds054289.mlab.com:54289/st_inst',
			databaseConnectionConfig : databaseConnectionConfig
		};

	
		function databaseConnectionConfig() {
			mongoose.Promise = global.Promise;	//setting the mongoose promise lib to global because mongoose promise lib is depracated
			var db = mongoose.connection;
		
			db.on('error', console.error.bind(console, 'connection error: '));
			db.once('open', function() {
  			//loading all models with schema defined already in their respective model page
			var Users = require(path.join(__dirname, '../models/users.js'));	
			var promoOfferEmails = require(path.join(__dirname, '../models/promoOffer.js'));
			var students = require(path.join(__dirname, '../models/students.js'));
			});
		}
		//exposing services
		return services;

	};
	
}());
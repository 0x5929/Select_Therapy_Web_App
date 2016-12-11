(function() {
	'use strict';

	module.exports = databaseConfigHandler;

	function databaseConfigHandler(mongoose, path){

		var services = {
			url : 'mongodb://localhost/ST_Inst/',
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
			});
		}
		//exposing services
		return services;

	};
	
}());
(function() {
	'use strict';

	module.exports = officeGenConfigHandler;


	function officeGenConfigHandler(officeGenerator){

		function officeGenSetup(configuration) {	

			var myDoc = officeGenerator(configuration);
			return {myDoc: myDoc};	//myDoc gets exposed as a service to be used in route middleware
		}

		var docxConfig = {
			'type': 'docx',
			'onend': function(written) {console.log('finished to create, total bytes created: ', written);},
			'onerr': function(err) {console.log('there is an error: ', err);}
		}

		//exposed to server.js

		var configs = {

			docxConfig: docxConfig,
			officeGenSetup : officeGenSetup
		};

		return configs;

	}

	


}());
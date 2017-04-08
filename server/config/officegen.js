(function() {
	'use strict';

	module.exports = officeGenConfigHandler;


	function officeGenConfigHandler(officeGenerator){

		var configs = {
			//configuration items:
			//docs
			//set up for middle ware use maybe?
			officeGenSetup: officeGenSetup
		};

		function officeGenSetup() {	//need to work on server logic
			var configuration = {
				'type': 'docx',
				'onend': function(written) {console.log('finished to create, total bytes created: ', written);},
				'onerr': function(err) {console.log('there is an error: ', err);}
			};

			var myDoc = officeGenerator(configuration);
			return {myDoc: myDoc};	//need to expose myDoc for route get sign in sheet middleware to be added with paragraphs and tables
		//first need to call this serverjs to start the configuration, run the oficeGenSetup()
		//to access, pass configOG.officeGenSetup.myDoc into route	
		}

		return configs;

	}

	


}());
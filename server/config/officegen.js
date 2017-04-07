(function() {
	'use strict';
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
	}

	module.exports = configs;

}());
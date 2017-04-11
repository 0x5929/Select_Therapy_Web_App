(function() {
	'use strict';
	module.exports = officeGenDocxServiceHandler; //doesnt matter whether its at the top of the bottom of script

	function officeGenDocxServiceHandler(officeGenerator, configuration) {
		
		var myDoc = officeGenerator(configuration);		

		var service = {
			myDoc: myDoc
		};
		

		return service;
	}

}());
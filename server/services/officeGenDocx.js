(function() {
	'use strict';
	module.exports = officeGenDocxServiceConstructHandler; //doesnt matter whether its at the top of the bottom of script

	function officeGenDocxServiceConstructHandler(officeGenerator, configuration) {

		this.myDoc = myMethod;

		function myMethod() {
			return officeGenerator(configuration);		//returns a new document object when constructed and ran with method	
		}

	}

}());
(function() {
	'use strict';
	module.exports = officeGenDocxServiceConstructer; //doesnt matter whether its at the top of the bottom of script

	function officeGenDocxServiceConstructer(officeGenerator, configuration) {	//the configuration passed in could be docx or xlsx

		this.myDoc = myMethod;

		function myMethod() {	//this method could be reused for excel doc or ppt, just need to pass in the correct configs
			return officeGenerator(configuration);		//returns a new document object when constructed and ran with method	
		}

	}

}());
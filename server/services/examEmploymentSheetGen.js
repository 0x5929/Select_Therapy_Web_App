(function(){

	'use strict';

	var examEmploymentService = {
		examEmploymentSheetGenHandler : examEmploymentSheetGenHandler
	};

	function examEmploymentSheetGenHandler (sheetObj, studentNames) {
		//init row
		sheetObj.data[0] = [];
		//insert first row stuff with student names etc..
	}

	module.exports = examEmploymentService;

}());
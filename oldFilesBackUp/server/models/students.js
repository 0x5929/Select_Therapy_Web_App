(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({
		//required fields
		enrollmentDate     : {type: Date, required: true},
		studentID          : {type: String, required: true},
		name               : {type: String, required: true},
		firstName          : {type: String, required: true},
		lastName           : {type: String, required: true},
		phoneNumber        : {type: Number, required: true},
		ssn                : {type: Number, required: true},
		address            : {type: String, required: true},
		email              : {type: String, required: true},
		program            : {type: [{}], required: true},
		tuition            : {type: Number, required: true},
		tuitionPaid        : {type: Boolean, required: true},
		graduate           : {type: Boolean, required: true},
		marketingSurvey    : {type: String, required: true},
		googleData   	   : [{
			title        : String,
			spreadsheetID: String,
			range        : String
		}],
		//dependent fields, which depends on certain boolean value from above required fields
		notGraduatingReason: String,
		jobPlaced          : Boolean,
		weeklyWorkHours    : String,
		payRate            : Number,
		employmentAddress  : String,
		placeOfEmployment  : String,
		jobPosition        : String,
		noJobReason        : String,
		passedExam         : Boolean,
		numberOfTries      : Number,
		noPassReason       : String
	});
	

/*ABOVE SCHEMA NEED TO ADD THE FOLLOWING: 
	- STUDENT ID: TYPE STRING, REQUIRED
	- TOTAL TUITION: TYPE NUMBER/CURRENCY REQUIRED
	- GOOGLEDATA: TYPE OBJ, REQUIRED
	PROP1: GOOGLE SHEET NAME 
	PROP2: GOOGLE SHEET RANGE
	PROP3: TYPE ARRAY, SHOULD HAVE TWO ARRAYS, ONE FOR STUDENT INFO AND ONE FOR STRF, ONE ARRAY IS ONE ROW IN SHEETES
	//MIGHT NEED TO DO FRONT END AUTHENTICATION FOR GOOGLE SHEETS ACCESS WHEN CLICK SYNC TO GOOGLE
GOOGLE DATA ARRAY NEEDS TO CONSIST OF ALL PROPERTIES THAT NEEDS TO BE PUSHED INTO GOOGLE
AS WE PUSH A PROPERY TO GOOGLE SHEETS, WE NEED TO PUSH THAT PROPERTY INTO THE DATA ARRAY
GOOGLE DATA ARRAY STARTS OFF WITH NO VALUES, BUT IN THE END NEEDS TO HAVE ALL THE PROPERTIES
ALL THE PROPERTIES WILL BE DEFINED IN THE FRONT END
*/

	module.exports = mongoose.model('students', studentSchema);
}());
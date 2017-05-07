(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({
		//required fields
		enrollmentDate: {type: Date, required: true},
		name: {type: String, required: true},
		phoneNumber: {type: Number, required: true},
		ssn: {type: Number, required: true},
		address: {type: String, required: true},
		email: {type: String, required: true},
		program: {type: [{}], required: true},
		tuitionPaid: {type: Boolean, required: true},
		graduate: {type: Boolean, required: true},
		marketingSurvey: {type: String, required: true},
		//dependent fields, which depends on certain boolean value from above required fields
		notGraduatingReason: String,
		jobPlaced: Boolean,
		weeklyWorkHours: String,
		payRate: Number,
		jobDescription: String,
		noJobReason: String,
		passedExam: Boolean,
		numberOfTries: Number,
		noPassReason: String
	});
	

/*ABOVE SCHEMA NEED TO ADD THE FOLLOWING: 
	- STUDENT ID: TYPE STRING, REQUIRED
	- TOTAL TUITION: TYPE NUMBER/CURRENCY REQUIRED
	- GOOGLEDATA: TYPE ARRAY, REQUIRED
GOOGLE DATA ARRAY NEEDS TO CONSIST OF ALL PROPERTIES THAT NEEDS TO BE PUSHED INTO GOOGLE
AS WE PUSH A PROPERY TO GOOGLE SHEETS, WE NEED TO PUSH THAT PROPERTY INTO THE DATA ARRAY
GOOGLE DATA ARRAY STARTS OFF WITH NO VALUES, BUT IN THE END NEEDS TO HAVE ALL THE PROPERTIES
ALL THE PROPERTIES WILL BE DEFINED IN THE FRONT END
*/

	module.exports = mongoose.model('students', studentSchema);
}());
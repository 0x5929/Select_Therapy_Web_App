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
		marketingSurvey    : {type: String, required: true},
		googleData   	   : [{
			title        : String,
			spreadsheetID: String,
			range        : String
		}],
	});
	

	module.exports = mongoose.model('students', studentSchema);
}());
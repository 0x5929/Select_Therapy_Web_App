(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({
		//required fields
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
	
	module.exports = mongoose.model('students', studentSchema);
}());
(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({	//NEED TO DEFINE WHICH FIELDS ARE REQUIRED TO BE ENTERED INTO DB
		name: String,
		phoneNumber: Number,
		ssn: Number,
		address: String,
		email: String,
		program: [{}],
		graduate: Boolean,
		notGraduatingReason: String,
		tuitionPaid: Boolean,
		jobPlaced: Boolean,
		weeklyWorkHours: String,
		payRate: Number,
		jobDescription: String,
		noJobReason: String,
		passedExam: Boolean,
		numberOfTries: Number,
		noPassReason: String,
		marketingSurvey: String
	});
	
	module.exports = mongoose.model('students', studentSchema);
}());
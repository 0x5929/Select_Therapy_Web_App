(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({
		name: String,
		phoneNumber: Number,
		ssn: Number,
		address: String,
		email: String,
		program: [{}],
		graduate: Boolean,
		tuitionPaid: Boolean,
		jobPlaced: Boolean,
		fullTimePos: Boolean,
		partTimePos: Boolean,
		payRate: Number,
		jobDescription: String,
		noJobReason: String,
		passedExam: Boolean,
		passedOn1st: Boolean,
		passedOn2nd: Boolean,
		passedOn3rd: Boolean,
		marketingSurvey: String
	});
	
	module.exports = mongoose.model('students', studentSchema);
}());
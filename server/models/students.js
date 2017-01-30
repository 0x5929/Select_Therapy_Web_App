(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	//define Schema
	var studentSchema = mongoose.Schema({
		name: String,
		phoneNumber: Number,
		email: String,
		program: String,
		graduate: Boolean,
		tuitionPaid: Boolean,
		jobPlaced: Boolean,
		fullTimePos: Boolean,
		partTimePos: Boolean,
		payRate: Number,
		jobDescription: String,
		noJobReason: String,
		passedExam: Boolean,
		PassedOn1st: Boolean,
		PassedOn2nd: Boolean,
		PassedOn3rd: Boolean
	});
	
	module.exports = mongoose.model('students', studentSchema);
}());
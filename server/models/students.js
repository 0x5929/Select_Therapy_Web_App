(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	var studentSchema = mongoose.Schema({
		name: String,
		phoneNumber: String,
		email: String,
		program: String,
		graduate: Boolean,
		paid: Boolean,
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
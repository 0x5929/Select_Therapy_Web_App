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
		passedOn1st: Boolean,
		passedOn2nd: Boolean,
		passedOn3rd: Boolean
	});
	
	module.exports = mongoose.model('students', studentSchema);
}());
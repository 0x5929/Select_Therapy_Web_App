(function() {

	'use strict';

	var studentValueObj = {

		firstName          : '',
		lastName           : '',
		enrollmentDate     : '',
		studentID          : '',
		phoneNumber        : '',
		ssn                : '',
		address            : '',
		email              : '',
		program            : [{programName: 'noneSelected', programRotation: ''}],
		tuition            : '',
		tuitionPaid        : 'noneSelected',
		graduate           : 'noneSelected',
		notGraduatingReason: 'noneSelected',
		marketingSurvey    : 'noneSelected',
		jobPlaced          : 'noneSelected',
		weeklyWorkHours    : 'noneSelected',
		payRate            : '',
		jobDescription     : '',
		noJobReason        : 'noneSelected',
		passedExam         : 'noneSelected',
		numberOfTries      : '',
		noPassReason       : 'noneSelected'

	};



	//expose value to api
	angular.module('myApp.admin').value('studentValue', studentValueObj);

}());
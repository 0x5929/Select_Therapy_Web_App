(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$rootScope', '$scope', 'ajaxService', 'toastFactory', adminSearchCtrlHandler]);

	function adminSearchCtrlHandler($rootScope, $scope, ajaxService, toastFactory) {
		var admin_search_ctrl = this;
		admin_search_ctrl.message = '';
		admin_search_ctrl.data = [];	//this gets passed in to the view, need to be updated as data comes back from server
		admin_search_ctrl.editOn = false;
		admin_search_ctrl.programEditArr = [];
		admin_search_ctrl.putData = {
			name: '',
			phoneNumber: '',
			ssn: '',
			address: '',
			email: '',
			program: [],
			tuitionPaid: '',
			graduate: '',
			passedExam: '',
			passedOn1st: '',
			passedOn2nd: '',
			passedOn3rd: ''
		};

		admin_search_ctrl.delete = function() {
			//admin delete routes
		};

		admin_search_ctrl.edit = function() {
			admin_search_ctrl.editOn = true;
		};

		admin_search_ctrl.showDetail = function(student) {
			admin_search_ctrl.showFullDetail = true;
			admin_search_ctrl.studentDetail = student;	//passing along the single student selected to show full detail by the controller
		};

		admin_search_ctrl.isAdmin = function() {
			if ($rootScope.currentUser.data.local.security === 'Admin')	return true;
			else return false;
		};

		admin_search_ctrl.putChangesFilter = function(data) {
			var putDataAfterFilter = {};
			var newDataForProgram = {};
			var putDataForProgram;
			for (var inputField in data) {	//first we filter through the fields that is being editted
				if (inputField === 'program'){	/*//this is for program field, only modify the ones that is being changed.
					putDataForProgram = data[inputField].filter(function(eachProgram) {
						return eachProgram.programName && eachProgram.programRotation;
					});
					console.log(putDataForProgram);
					if (putDataForProgram[0])
						putDataAfterFilter[inputField] = putDataForProgram;
					if (admin_search_ctrl.newProgramName && admin_search_ctrl.newProgramRotation){	//this condition is for new program additions
						newDataForProgram.programName = admin_search_ctrl.newProgramName;
						newDataForProgram.programRotation = admin_search_ctrl.newProgramRotation;
						putDataForProgram.push(newDataForProgram);
						putDataAfterFilter[inputField] = putDataForProgram;
					} 
					else break;*/
					if (admin_search_ctrl.programEditArr[0])
						putDataAfterFilter[inputField] = admin_search_ctrl.programEditArr;
					if (admin_search_ctrl.newProgramName && admin_search_ctrl.newProgramRotation){
						newDataForProgram.programName = admin_search_ctrl.newProgramName;
						newDataForProgram.programRotation = admin_search_ctrl.newProgramRotation;
						admin_search_ctrl.studentDetail.program.push(newDataForProgram);
						putDataAfterFilter[inputField] = admin_search_ctrl.studentDetail.program;
						console.log(admin_search_ctrl.studentDetail);
						console.log(putDataAfterFilter);
					}
				}
				else if (data[inputField] !== '')	//for the rest of the fields, we filter through the ones that is editted
					putDataAfterFilter[inputField] = data[inputField];
			}
			//this will convert false to empty string to be converted to boolean false or 0 value in the server side.
//			if (putDataAfterFilter.program && putDataAfterFilter.program.toLowerCase() === 'false')	putDataAfterFilter.program = '';
			if (putDataAfterFilter.tuitionPaid && putDataAfterFilter.tuitionPaid.toLowerCase() === 'false')	putDataAfterFilter.tuitionPaid = '';
			if (putDataAfterFilter.graduate && putDataAfterFilter.graduate.toLowerCase() === 'false')	putDataAfterFilter.graduate = '';
			if (putDataAfterFilter.passedExam && putDataAfterFilter.passedExam.toLowerCase() === 'false')	putDataAfterFilter.passedExam = '';
			if (putDataAfterFilter.passedOn1st && putDataAfterFilter.passedOn1st.toLowerCase() === 'false')	putDataAfterFilter.passedOn1st = '';
			if (putDataAfterFilter.passedOn2nd && putDataAfterFilter.passedOn2nd.toLowerCase() === 'false')	putDataAfterFilter.passedOn2nd = '';
			if (putDataAfterFilter.passedOn3rd && putDataAfterFilter.passedOn3rd.toLowerCase() === 'false')	putDataAfterFilter.passedOn3rd = '';
			//need to attach the original name so the server can look it up and edit its contents
			putDataAfterFilter.originalName = admin_search_ctrl.studentDetail.name;
			//returning the filtered through obj
			return putDataAfterFilter;
		};

		admin_search_ctrl.submit = function () {
			var config = {
				params: {
					parameter: admin_search_ctrl.searchParameter,
					input: admin_search_ctrl.searchInput
				}
			};

			ajaxService.get('/admin/search/', config)
				.then(function(successResponse) {
					admin_search_ctrl.showFullDetail = false;
					if (Array.isArray(successResponse.data)){	//need to account for when an array of users is returned from server for findAll method in db
						successResponse.data.forEach(function(student) {	//each student from the response will map their program to only its name
																			//then having the array of mapped results to be joined so it returns strings of names only
							student.programViewForResultsTable = student.program.map(function(program) {
								return program.programName;
							}).join();
						});	
						admin_search_ctrl.data = successResponse.data;	//data is used for iteration in ng-repeat
						admin_search_ctrl.message = '';
						admin_search_ctrl.showResultTable = true;
					}
					else {
						admin_search_ctrl.data = [];	
						successResponse.data.programViewForResultsTable = successResponse.data.program.map(function(program) {
							return program.programName;
						}).join();
						admin_search_ctrl.data.push(successResponse.data);
						admin_search_ctrl.message = '';
						admin_search_ctrl.showResultTable = true;
					}
				}, function(failureResponse) {
					admin_search_ctrl.data = [];
					admin_search_ctrl.showFullDetail = false;
					admin_search_ctrl.message = failureResponse.data;
				});
		};

		admin_search_ctrl.submitChanges = function() {
			var data = admin_search_ctrl.putChangesFilter(admin_search_ctrl.putData);
			for (var key in admin_search_ctrl.putData) {	//clears all fields when submit is pressed
				admin_search_ctrl.putData[key] = '';
			}
			admin_search_ctrl.editOn = false;	//after clicking submit changes, edit is turned off
			admin_search_ctrl.editCurrentProgram = false;

			console.log(data);
			ajaxService.put('/admin/modify/', data)
				.then(function(successResponse) {	//could add a success toast
					toastFactory.sucessEdit();
					console.log(successResponse);
				}, function(failureResponse) {	//could add a failure toast
					toastFactory.errorToast('Sorry, an error has occured');
					console.log(failureResponse);
				});
		};
	}
}());
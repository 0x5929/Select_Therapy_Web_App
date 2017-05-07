(function() {
	'use strict';

	angular.module('myApp.admin', ['ngFileSaver', 'services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$scope', 'FileSaver', 'Blob', 'ajaxService', adminSearchCtrlHandler]);

	function adminSearchCtrlHandler($scope, FileSaver, Blob, ajaxService) {
		var admin_search_ctrl                       = this;
		admin_search_ctrl.message                   = '';
		admin_search_ctrl.data                      = [];	//this gets passed in to the view, need to be updated as data comes back from server
		//setting button disabled to initially to be false
		admin_search_ctrl.isSignInDisabled          = false;	
		admin_search_ctrl.isContactListDisabled     = false;
		admin_search_ctrl.isTestSignalDisabled      = false;

		admin_search_ctrl.showDetail = function(student) {
			admin_search_ctrl.showFullDetail = true;	//turning on showing full detail
			admin_search_ctrl.studentDetail = student;	//passing along the single student selected to show full detail in another controller obj
		};

		admin_search_ctrl.submitBtn = function () {

			var config = {};
			if (admin_search_ctrl.searchBy === 'Student_Info'){	//depending on searching by student info or program info
				config.params = {
						parameter: admin_search_ctrl.searchParameter,
						input: admin_search_ctrl.searchInput
					};
			}else if (admin_search_ctrl.searchBy === 'Program_Info'){
				config.params = {
						program: admin_search_ctrl.searchProgram,
						rotation: admin_search_ctrl.searchRotation
					};
			}

			ajaxService.get('/admin/search/', config)
				.then(function(successResponse) {
					console.log(successResponse);
					admin_search_ctrl.showFullDetail = false;	//turning off visuals for full detail
					if (Array.isArray(successResponse.data)){	//need to account for when an array of users is returned from server for findAll method in db
						successResponse.data.forEach(function(student) {	//each student from the response will map their program to only its name
																			//then having the array of mapped results to be joined so it returns strings of names only
							student.programViewForResultsTable = student.program.map(function(program) {
								return program.programName;
							}).join();
						});	
						admin_search_ctrl.data = successResponse.data;	//data is used for iteration in ng-repeat
						admin_search_ctrl.message = '';	//clearing the messsage variable
						admin_search_ctrl.showResultTable = true;	//turning on results table for search results
					}
					else {	//the condition where only one student is the result
						admin_search_ctrl.data = [];	//ensure data arr is avaliable 
						successResponse.data.programViewForResultsTable = successResponse.data.program.map(function(program) {
							return program.programName;
						}).join();	//maping and joining program names for one student's program array property
						admin_search_ctrl.data.push(successResponse.data);	//pushing the single student obj into the data arr
						admin_search_ctrl.message = '';	//clearing mesesage
						admin_search_ctrl.showResultTable = true;	//turning on the results table
					}
				}, function(failureResponse) {
					console.log(failureResponse);
					admin_search_ctrl.data = [];	//failed response, ensure data is empty, so previous results wont show
					admin_search_ctrl.showFullDetail = false;	//turning off full detail view
					admin_search_ctrl.message = failureResponse.data;	//setting error message to the failure response data message
				});
		};

		admin_search_ctrl.adminFunctions = function(func) {
			//setting the the arr of student names for server to process
			var studentNames = [];
			admin_search_ctrl.data.forEach(function(student) {
				studentNames.push(student.name);
			});
			//turning on button disabled after click (could be placed in the success promise)
			switch (func) {
				case 'signInSheet' : 
					admin_search_ctrl.isSignInDisabled = true;
					break;
				case 'contactList' :
					admin_search_ctrl.isContactListDisabled = true;
					break;
				case 'testSignal' : 	//COMMENTED OUT BECAUSE THE NEXT FUNC SHOULD BE ADMIN FOLDER DOC 
					admin_search_ctrl.isTestSignalDisabled = true;
					break;
			}

			var config = {
				dataType    : 'binary',
				processData : false,
				responseType: 'arraybuffer',
				params      : {
					studentNames   : studentNames, 	//list of student names in the rotation class
					programName    : admin_search_ctrl.searchProgram,	//program name     (all of these will be used in the sign in sheet)
					programRotation: admin_search_ctrl.searchRotation,	//program rotation
					functionality: func
				}
			};

			if (func === 'signInSheet') {
				ajaxService.get('/admin/search/generateSignIn/', config)
					.then(function(successResponse) {
						var file = new Blob([successResponse.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						FileSaver.saveAs(file, 'signinsheet.docx');
					}, function(failureResponse) {
						console.log(failureResponse);
				});
			}else if (func === 'contactList') {
				ajaxService.get('/admin/search/generateContactList/', config)
					.then(function(successResponse) {
						var file = new Blob([successResponse.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						FileSaver.saveAs(file, 'contactList.docx');
					}, function(failureResponse) {
						console.log(failureResponse);
				});				
			}
			//NEXT FUNC: ADMIN FOLDER DOC PER STUDENT SHOULD HAVE EXAM EMPLOYMNENT CLINICAL INFO ON IT
			// else if (func === 'adminFolderStudentDoc') {
			// 	//ajax call for admin folder student doc
			// }else if (func === 'testSignal') {
			// 	ajaxService.get('/admin/search/testSignal/', config)
			// 		.then(function(successResponse) {
			// 			var file = new Blob([successResponse.data], {type: 'application/msword'});
			// 			FileSaver.saveAs(file, 'test.doc');
			// 		}, function(failureResponse) {
			// 			console.log(failureResponse);				
			// 	});		
			// }
			else if (func === 'pushDataToSTRF') {
				//check if data had been sent before
				//push data to an already sent arr
				//ajax call to google sheets with address, sheet page number, and cell 
				//each student needs to have one more property with an arr of values that had been pushed to google 

			}
			// else if (func === 'examEmploymentSheet') {
			// 	//ajax call for exam employment sheet
			// 	ajaxService.get('/admin/search/generateExamEmploymentSheet/', config)
			// 		.then(function(successResponse) {
			// 			var file = new Blob([successResponse.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
			// 			FileSaver.saveAs(file, 'studentExamEmploymentSheet.xlsx');
			// 		}, function(failureResponse) {
			// 			console.log(failureResponse);
			// 	});	
			// }else if (func === 'clinicalCheckList') {
			// 	//ajax call for clinical check list
			// }
		};

	}
}());
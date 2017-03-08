(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$rootScope', '$scope', 'ajaxService', 'toastFactory', adminSearchCtrlHandler]);

	function adminSearchCtrlHandler($rootScope, $scope, ajaxService, toastFactory) {
		var admin_search_ctrl = this;
		admin_search_ctrl.message = '';
		admin_search_ctrl.data = [];	//this gets passed in to the view, need to be updated as data comes back from server
		admin_search_ctrl.editOn = false;
		admin_search_ctrl.showEditBtn = true;
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

		admin_search_ctrl.deleteProgram = function(programObj) {
			//delete program
			admin_search_ctrl.studentDetail.program = admin_search_ctrl.studentDetail.program.filter(function(eachProgram) {
				return eachProgram.programName !== programObj.programName;	//returning only obj that dont match with parameter obj, thus deleting that from array
			});
			admin_search_ctrl.submitChanges();	//calling submitChanges so changes can be submmited to database
		};

		admin_search_ctrl.modifyProgram = function(programObj) {
			admin_search_ctrl.studentDetail.program.forEach(function(eachProgram) {
				if (eachProgram.programName !== programObj.programName)	return;	//skip to next program obj if its not matched
				else{	//once matched update the program name and rotation field with ng-model in view
					if (admin_search_ctrl.modifyProgramName)	eachProgram.programName = admin_search_ctrl.modifyProgramName;
					if (admin_search_ctrl.modifyProgramRotation)	eachProgram.programRotation = admin_search_ctrl.modifyProgramRotation;
				}
				admin_search_ctrl.submitChanges();	//finally call submit changes again for data to be saved in db, meaning one modification can happen per time.

			});
		};

		admin_search_ctrl.submitNewProgram = function() {
			admin_search_ctrl.submitChanges();	
		};

		admin_search_ctrl.edit = function() {
			admin_search_ctrl.editOn = true;
			admin_search_ctrl.showFinalCancel = true;
			admin_search_ctrl.showSubmitChanges = true;
		};

		admin_search_ctrl.showDetail = function(student) {
			admin_search_ctrl.showFullDetail = true;	//turning on showing full detail
			admin_search_ctrl.studentDetail = student;	//passing along the single student selected to show full detail in another controller obj
		};

		admin_search_ctrl.isAdmin = function() {
			if ($rootScope.currentUser.data.local.security === 'Admin')	return true;
			else return false;
		};

		admin_search_ctrl.programModifyCancel = function() {
			admin_search_ctrl.showFinalCancel = true;
			admin_search_ctrl.showEditBtn = true;
			admin_search_ctrl.showSubmitChanges = true;	//turn submit changes btn back on.
			admin_search_ctrl.editCurrentProgramBtn = false;	//turning all program edits off
			admin_search_ctrl.addNewProgram = false;
			admin_search_ctrl.deleteProgramBtn = false
			if (Array.isArray(admin_search_ctrl.modifyCurrentProgramInputNBtn)){	//if evaluated as array
				admin_search_ctrl.modifyCurrentProgramInputNBtn.forEach(function(value) {
					value = false;
				});
			}else{	//if evaluated as obj
				for (var key in admin_search_ctrl.modifyCurrentProgramInputNBtn){
					admin_search_ctrl.modifyCurrentProgramInputNBtn[key] = false;
				}
			}
		};

		admin_search_ctrl.putChangesFilter = function(data) {
			var putDataAfterFilter = {};
			var newDataForProgram = {};
			var putDataForProgram;
			for (var inputField in data) {	//first we filter through the fields that is being editted
				if (inputField === 'program'){//if putData.program:
					if (admin_search_ctrl.modifyProgramName || admin_search_ctrl.modifyProgramRotation)	//if modifying program
						putDataAfterFilter[inputField] = admin_search_ctrl.studentDetail.program;
					if (admin_search_ctrl.newProgramName && admin_search_ctrl.newProgramRotation){	//if adding new program
						newDataForProgram.programName = admin_search_ctrl.newProgramName;	//setting newDataForProgram obj
						newDataForProgram.programRotation = admin_search_ctrl.newProgramRotation;

						if (admin_search_ctrl.modifyProgramName || admin_search_ctrl.modifyProgramRotation){	//if programs are being added and editted at the same time
							putDataAfterFilter[inputField].push(newDataForProgram);	//pushing the new one is the already editted data obj from earlier condition
							console.log(putDataAfterFilter);
							console.log(newDataForProgram);
						}
						else{
							admin_search_ctrl.studentDetail.program.push(newDataForProgram);	//pushing this object into the original 
							putDataAfterFilter[inputField] = admin_search_ctrl.studentDetail.program;	//setting original to the filtered through data obj
							console.log(admin_search_ctrl.studentDetail);
							console.log(putDataAfterFilter);
						}
					}
					if (!putDataAfterFilter[inputField])	//this checks if the two above condidtions: edit or add are not met, 
						putDataAfterFilter[inputField] = admin_search_ctrl.studentDetail.program;	//if they arent met, the puDataAFterFilter[inputField] part of the obj should be undefined, 
															//so lets equate the student details array, so we update programs every edit, and account for deleted programs 
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
					admin_search_ctrl.data = [];	//failed response, ensure data is empty, so previous results wont show
					admin_search_ctrl.showFullDetail = false;	//turning off full detail view
					admin_search_ctrl.message = failureResponse.data;	//setting error message to the failure response data message
				});
		};

		admin_search_ctrl.submitChanges = function() {
			var data = admin_search_ctrl.putChangesFilter(admin_search_ctrl.putData);
			
			admin_search_ctrl.editOn = false;	//after clicking submit changes, edit and the rest of ng-ifs are off
			admin_search_ctrl.editCurrentProgram = false;
			admin_search_ctrl.addNewProgram = false;
			admin_search_ctrl.deleteProgramBtn = false;

			console.log(data);
			ajaxService.put('/admin/modify/', data)
				.then(function(successResponse) {	//could add a success toast
					for (var key in admin_search_ctrl.putData) {	//clears all fields when submit is pressed
						admin_search_ctrl.putData[key] = '';
					}
					admin_search_ctrl.newProgramName = admin_search_ctrl.newProgramRotation = '';	//clears new program addition field
					admin_search_ctrl.modifyProgramName = admin_search_ctrl.modifyProgramRotation = ''; //clears modify program fields
					toastFactory.sucessEdit();
					console.log(successResponse);
				}, function(failureResponse) {	//could add a failure toast
					toastFactory.errorToast('Sorry, an error has occured');
					console.log(failureResponse);
				});
		};
	}
}());
(function() {
	'use strict';

	angular.module('myApp.admin')
		.controller('adminModifyController', ['$rootScope', '$scope', 'ajaxService', 'toastFactory', adminModifyControllerHandler]);

		function adminModifyControllerHandler($rootScope, $scope, ajaxService, toastFactory) {
			//admin modify controller code
			var admin_modify_ctrl = this;
			admin_modify_ctrl.parentScope = $scope.admin_search_ctrl;
			admin_modify_ctrl.editOn = false;
			admin_modify_ctrl.showEditBtn = true;
			admin_modify_ctrl.putData = {
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

			admin_modify_ctrl.cancelProgramEditCondition = function() {	//ngif in the view for cancel Program Edit condition
				if (admin_modify_ctrl.showModifyThisProgramBtn || 
					admin_modify_ctrl.showModifyCurrentProgramInputNBtn[0] ||
					 admin_modify_ctrl.showAddNewProgramField || 
					 admin_modify_ctrl.showDeleteProgramBtn)
					return true;
				else return false;
			};

			admin_modify_ctrl.turnEditOff = function() {
				var turnOff = [	//all the edit fields
					'editNameFieldOn',
					'editPhoneFieldOn',
					'editSsnFieldOn',
					'editAddressFieldOn',
					'editEmailFieldOn'
				];

				turnOff.forEach(function(eachTarget) {	//turning each edit to false
					admin_modify_ctrl[eachTarget] = false;
				});
			};

			admin_modify_ctrl.editCurrentProgramBtn = function() {
				var turnOn = [
					'showModifyThisProgramBtn'
				];
				var turnOff = [
					'showDeleteProgramBtn',
					'showSubmitChangesBtn',
					'showEditBtn'
				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				admin_modify_ctrl.turnEditOff();
			};

			admin_modify_ctrl.addNewProgramBtn = function() {
				var turnOn = [
					'showAddNewProgramField'
				];
				var turnOff = [
					'showDeleteProgramBtn',
					'showSubmitChangesBtn',
					'showEditBtn'
				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				admin_modify_ctrl.turnEditOff();
			};

			admin_modify_ctrl.deleteProgramBtn = function() {	//this function is activated when the delete program is first pressed, initializing the delete btns for each program
				var turnOn = [
					'showDeleteProgramBtn'
				];
				var turnOff = [
					'showAddNewProgramField',
					'showModifyThisProgramBtn',
					'showSubmitChangesBtn',
					'showEditBtn'
				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				admin_modify_ctrl.turnEditOff();

			};

			admin_modify_ctrl.modifyThisProgramBtn = function(eachProgram) {
				var originalProgramIndex = admin_modify_ctrl.parentScope.studentDetail.program.indexOf(eachProgram);
				var turnOff = [
					'showModifyThisProgramBtn',
					'showFinalCancelBtn',
					'showSubmitChangesBtn'
				];

				//turning on attribute
				admin_modify_ctrl.showModifyCurrentProgramInputNBtn[originalProgramIndex] = true;
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});
			};

			admin_modify_ctrl.submitModificationBtn = function(programToBeModified) {
				var originalProgramIndex = admin_modify_ctrl.parentScope.studentDetail.program.indexOf(programToBeModified);
				//modify program
				admin_modify_ctrl.modifyProgram(programToBeModified);
				//turn modify current program input and btn off
				admin_modify_ctrl.showModifyCurrentProgramInputNBtn[originalProgramIndex] = false;
			};

			admin_modify_ctrl.deleteThisProgramBtn = function(programObj) {	//this wont work because it depends on adminSeachController data such as programs. need to find a way to access it
				//delete program
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;	//accessing parent controller
				console.log(originalProgram);
				originalProgram = originalProgram.filter(function(eachProgram) {
					return eachProgram.programName !== programObj.programName;	//returning only obj that dont match with parameter obj, thus deleting that from array
				});
				admin_modify_ctrl.submitChanges();	//calling submitChanges so changes can be submmited to database
			};

			admin_modify_ctrl.modifyProgram = function(programObj) {
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;
				originalProgram.forEach(function(eachProgram) {
				if (eachProgram.programName !== programObj.programName)	return;	//skip to next program obj if its not matched
				else{	//once matched update the program name and rotation field with ng-model in view
					if (admin_modify_ctrl.modifyProgramName)	eachProgram.programName = admin_modify_ctrl.modifyProgramName;
					if (admin_modify_ctrl.modifyProgramRotation)	eachProgram.programRotation = admin_modify_ctrl.modifyProgramRotation;
				}
				admin_modify_ctrl.submitChanges();	//finally call submit changes again for data to be saved in db, meaning one modification can happen per time.

			});
			};

			admin_modify_ctrl.submitNewProgramBtn = function() {
				admin_modify_ctrl.submitChanges();	
			};

			admin_modify_ctrl.edit = function() {
				admin_modify_ctrl.editOn = true;
				admin_modify_ctrl.showFinalCancelBtn = true;
				admin_modify_ctrl.showSubmitChangesBtn = true;
			};

			admin_modify_ctrl.isAdmin = function() {
				if ($rootScope.currentUser.data.local.security === 'Admin')	return true;
				else return false;
			};

			admin_modify_ctrl.programModifyCancel = function() {
				var turnOn = [
					'showFinalCancelBtn',
					'showEditBtn'
				];
				var turnOff = [
					'showModifyThisProgramBtn',
					'showAddNewProgramField',
					'showDeleteProgramBtn'
				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				//turning off show modify current program input and button, either as an arr or as an obj
				if (Array.isArray(admin_modify_ctrl.showModifyCurrentProgramInputNBtn)){	//if evaluated as array
					admin_modify_ctrl.showModifyCurrentProgramInputNBtn.forEach(function(value) {
						value = false;
					});
				}else{	//if evaluated as obj
					for (var key in admin_modify_ctrl.showModifyCurrentProgramInputNBtn){
						admin_modify_ctrl.showModifyCurrentProgramInputNBtn[key] = false;
					}
				}
			};

			admin_modify_ctrl.putChangesFilter = function(data) {
				var putDataAfterFilter = {};
				var newDataForProgram = {};
				var putDataForProgram;
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;
				var originalName = $scope.admin_search_ctrl.studentDetail.name;
				for (var inputField in data) {	//first we filter through the fields that is being editted
					if (inputField === 'program'){//if putData.program:
						if (admin_modify_ctrl.modifyProgramName || admin_modify_ctrl.modifyProgramRotation)	//if modifying program
							putDataAfterFilter[inputField] = originalProgram;
						if (admin_modify_ctrl.newProgramName && admin_modify_ctrl.newProgramRotation){	//if adding new program
							newDataForProgram.programName = admin_modify_ctrl.newProgramName;	//setting newDataForProgram obj
							newDataForProgram.programRotation = admin_modify_ctrl.newProgramRotation;

							if (admin_modify_ctrl.modifyProgramName || admin_modify_ctrl.modifyProgramRotation){	//if programs are being added and editted at the same time
								putDataAfterFilter[inputField].push(newDataForProgram);	//pushing the new one is the already editted data obj from earlier condition
								console.log(putDataAfterFilter);
								console.log(newDataForProgram);
							}
							else{
								originalProgram.push(newDataForProgram);	//pushing this object into the original 
								putDataAfterFilter[inputField] = originalProgram;	//setting original to the filtered through data obj
								console.log(originalProgram);
								console.log(putDataAfterFilter);
							}
						}
						if (!putDataAfterFilter[inputField])	//this checks if the two above condidtions: edit or add are not met, 
							putDataAfterFilter[inputField] = originalProgram;	//if they arent met, the puDataAFterFilter[inputField] part of the obj should be undefined, 
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
				putDataAfterFilter.originalName = originalName;
				//returning the filtered through obj
				return putDataAfterFilter;
			};

			admin_modify_ctrl.submitChanges = function() {
				var data = admin_modify_ctrl.putChangesFilter(admin_modify_ctrl.putData);
				
				admin_modify_ctrl.editOn = false;	//after clicking submit changes, edit and the rest of ng-ifs are off
				admin_modify_ctrl.editCurrentProgram = false;
				admin_modify_ctrl.addNewProgram = false;
				admin_modify_ctrl.deleteProgramBtn = false;

				console.log(data);
				ajaxService.put('/admin/modify/', data)
					.then(function(successResponse) {	//could add a success toast
						for (var key in admin_modify_ctrl.putData) {	//clears all fields when submit is pressed
							admin_modify_ctrl.putData[key] = '';
						}
						admin_modify_ctrl.newProgramName = admin_modify_ctrl.newProgramRotation = '';	//clears new program addition field
						admin_modify_ctrl.modifyProgramName = admin_modify_ctrl.modifyProgramRotation = ''; //clears modify program fields
						toastFactory.sucessEdit();
						console.log(successResponse);
					}, function(failureResponse) {	//could add a failure toast
						toastFactory.errorToast('Sorry, an error has occured');
						console.log(failureResponse);
					});
			};
		}

}());
(function() {
	'use strict';

	angular.module('myApp.admin')
		.controller('adminModifyController', ['$rootScope', '$scope', 'ajaxService', 'toastFactory', adminModifyControllerHandler]);

		function adminModifyControllerHandler($rootScope, $scope, ajaxService, toastFactory) {
			var admin_modify_ctrl = this;
			admin_modify_ctrl.parentScope = $scope.admin_search_ctrl;	//accessing admin_search_ctrl
			admin_modify_ctrl.showModifyCurrentProgramInput = []; //inititalize empty arr for program input edit				
			admin_modify_ctrl.editProgramArr = [];	////need to initialize program edit array obj
			admin_modify_ctrl.putData = {	//initialize data object and all necessary keys for PUT request in submitChangesBtn()
				name: '',
				phoneNumber: '',
				ssn: '',
				address: '',
				email: '',
				program: [],
				tuitionPaid: '',
				marketingSurvey: '',
				graduate: '',
				passedExam: '',
				numberOfTries: '',
				noPassReason: '',
				jobPlaced: '',
				weeklyWorkHours: '',
				payRate: '',
				jobDescription: '',
				noJobReason: '',
				notGraduatingReason: ''
			};

/*
	a check for security, 
	only security clearance of 'Admin' gets to the access to edit and to delete student details
*/			
			admin_modify_ctrl.isAdmin = function() {
				if ($rootScope.currentUser.data.local.security === 'Admin')	return true;
				else return false;
			};

/*
	filter function for the data object, to get it ready for err check
	the filter function filters through only the data being modified,
	and successfully manipulates program edit
*/
			

/*
	NEW LOGIC FOR MODIFYING/ADDING/DELETING PROGRAMS: [{PROGRAM 1 DETAILS}, {PROGRAM 2 DETAILS}]
		1. have a edit button shown only if admin
		2. if edit button is clicked => shows individual edit/delete button and add program button and also a cancel edit button
			2a. once edit button is clicked, contruct a new program obj and copy the old original programs ready for modification. 
				2aa. if modifying individual program => find the matching program and edit
				2ab. if adding new program => add the program details to the new program obj (for edit in step 2a)
				2ac. if deleting program => delete the matching program in the new program obj
			2b. push the new program obj into putData
		3. clicking cancel will remove the new program obj and all of its properties, kind of like a refresh
		4. also need a check for error, make sure there is no matching programs, and no empty programs (noneSelected as name) in the new contructed program arr, if there is, make sure data dont get sent to server!!
*/
			admin_modify_ctrl.putChangesFilter = function(data) {
				var putDataForProgram;
				var putDataAfterFilter = {};
				var newDataForProgram = {};
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;	//WARNING THIS ORIGINAL PROGRAM IS MODIFIED BY THE MODIFY BTN ABOVE, 
																							//THUS IS THE MOST UPDATED PROGRAM TO BE USED IN THE LOGIC BELOW IN ORDER TO BE 
																							//PUSHED INTO THE PUTDATA FILTER OBJ
				var originalName = $scope.admin_search_ctrl.studentDetail.name;
				for (var inputField in data) {	//first we filter through the fields that is being editted
					if (inputField === 'program'){//if putData.program:
						// if (admin_modify_ctrl.modifyProgramName || admin_modify_ctrl.modifyProgramRotation)	//if modifying program
						// 	putDataAfterFilter[inputField] = originalProgram;	//original program had been editted in the modify program btn function
						// if (admin_modify_ctrl.newProgramName && admin_modify_ctrl.newProgramRotation){	//if adding new program
						// 	newDataForProgram.programName = admin_modify_ctrl.newProgramName;	//setting newDataForProgram obj
						// 	newDataForProgram.programRotation = admin_modify_ctrl.newProgramRotation;
						// 	if (admin_modify_ctrl.modifyProgramName || admin_modify_ctrl.modifyProgramRotation){	//if programs are being added and editted at the same time
						// 		putDataAfterFilter[inputField].push(newDataForProgram);	//pushing the new one is the already editted data obj from earlier condition
						// 	}
						// 	else{	//tightly coupled, maybe think of another logic for editted programs
						// 		originalProgram.push(newDataForProgram);	//pushing this object into the original, which should not be editted because it is hasnt gone through the modify program function
						// 		putDataAfterFilter[inputField] = originalProgram;	//setting original to the filtered through data obj
						// 	}
						// }
						// if (!putDataAfterFilter[inputField])	//this checks if the two above condidtions: edit or add are not met, 
						// 	putDataAfterFilter[inputField] = originalProgram;	//if they arent met, the puDataAFterFilter[inputField] part of the obj should be undefined, 
						// 										//so lets equate the student details array, so we update programs every edit, and account for deleted programs
						putDataAfterFilter[inputField] = admin_modify_ctrl.editProgramArr; //equating the two, makes all code above simplified
					}	//for the rest of the fields, we filter through the ones that is editted
					else if (data[inputField] !== '' && data[inputField] !== 'noneSelected')	putDataAfterFilter[inputField] = data[inputField];		
				}
				//NEEDED TO BE EVLUATED FROM FALSE TO '', BC IF ITS EMPTY STRING, IT WILL BE IGNORE GOING INTO THE SERVER BY THE ABOVE LOGIC
				//this will convert false to empty string to be converted to boolean false or 0 value in the server side.
				if (putDataAfterFilter.tuitionPaid && putDataAfterFilter.tuitionPaid === 'false')	putDataAfterFilter.tuitionPaid = '';
				if (putDataAfterFilter.graduate && putDataAfterFilter.graduate === 'false')	putDataAfterFilter.graduate = '';
				if (putDataAfterFilter.jobPlaced && putDataAfterFilter.jobPlaced === 'false')	putDataAfterFilter.jobPlaced = '';
				if (putDataAfterFilter.passedExam && putDataAfterFilter.passedExam === 'false')	putDataAfterFilter.passedExam = '';

				//need to attach the original name so the server can look it up and edit its contents
				putDataAfterFilter.originalName = originalName;
				//returning the filtered through obj
				return putDataAfterFilter;
			};

			admin_modify_ctrl.noErrCheck = function(dataTobeChecked) {
						//err conditions
				if (dataTobeChecked.name && !isNaN(dataTobeChecked.name)){
					toastFactory.errorToast("please check the student's first and last name input");
					return false;
				}
				if (dataTobeChecked.phoneNumber && (isNaN(dataTobeChecked.phoneNumber) || dataTobeChecked.phoneNumber.length !== 10)){
					toastFactory.errorToast("please check the student's phone number input");
					return false;
				}
				if (dataTobeChecked.ssn && (isNaN(dataTobeChecked.ssn) || dataTobeChecked.ssn.length !== 9)){
					toastFactory.errorToast("please check the student's ssn input");
					return false;
				}
				if (dataTobeChecked.address && !isNaN(dataTobeChecked.address)){
					toastFactory.errorToast("please check the student's address input");
					return false;
				}
				if (dataTobeChecked.email && (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(dataTobeChecked.email)))) {
					toastFactory.errorToast("please enter a valid email");
					return false;
				}
				if (dataTobeChecked.program[0]){
					for (var i = 0; i < dataTobeChecked.program.length; i++){
						if (dataTobeChecked.program[i]['programName'] === 'noneSelected'){
							toastFactory.errorToast("make sure you choose a valid program name");
							return false;
						}
						if (isNaN(dataTobeChecked.program[i]['programRotation'])){
							toastFactory.errorToast("make sure you enter a valid program rotation number")
							return false;
						}
					}
					for (var j = 0; j < dataTobeChecked.program.length; j++){
						for (var k = 0; k < dataTobeChecked.program.length; k++){
							if (j !== k && dataTobeChecked.program[j]['programName'] === dataTobeChecked.program[k]['programName']){
								toastFactory.errorToast("please make sure you don't add two of the same programs");
								dataTobeChecked.program.pop();	//this will take out the last added one
								dataTobeChecked.program.forEach(function(eachProgram) {	//turn on each program edit field
									admin_modify_ctrl.modifyThisProgramBtn(eachProgram);
								});
								return false;
							}
						}
					}
				}
				if (dataTobeChecked.graduate === 'noneSelected'){
					toastFactory.errorToast("please check the graduate field");
					return false;
				}
				if (dataTobeChecked.tuitionPaid === 'noneSelected'){
					toastFactory.errorToast("please check the tuition field");
					return false;
				}
				if (dataTobeChecked.graduate === 'true' && dataTobeChecked.jobPlaced === 'noneSelected'){
					toastFactory.errorToast("please check the job placed field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && dataTobeChecked.weeklyWorkHours === 'noneSelected'){
					toastFactory.errorToast("please check the weekly hours field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && isNaN(dataTobeChecked.payRate)){
					toastFactory.errorToast("please enter a valid pay rate");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.jobDescription)){
					toastFactory.errorToast("please check the job description field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === '' && !(dataTobeChecked.noJobReason)){
					toastFactory.errorToast("please check the unemployed reason field");
					return false;
				}
				if (dataTobeChecked.graduate === 'true' && dataTobeChecked.passedExam === 'noneSelected'){
					toastFactory.errorToast("please check the passed exam field");
					return false;
				}
				if (dataTobeChecked.graduate === '' && dataTobeChecked.notGraduatingReason === 'noneSelected'){
					toastFactory.errorToast("please check the no gradute field");
					return false;
				}
				if (dataTobeChecked.passedExam === 'true' && isNaN(dataTobeChecked.numberOfTries)){
					toastFactory.errorToast("please check the exam num of tries field");
					return false;
				}
				if (dataTobeChecked.passedExam === '' && dataTobeChecked.noPassReason === 'noneSelected'){
					toastFactory.errorToast("please check the no pass reason field");
					return false;
				}
				//returns true for ajax to be run if none of the above err conditions are met
				return true;	
			};

			admin_modify_ctrl.submitChangesBtn = function() {
				var data = admin_modify_ctrl.putChangesFilter(admin_modify_ctrl.putData);
				var turnOff = [
					'showModifyThisProgramBtn',
					'showAddNewProgramField',
					'showDeleteProgramBtn'
				];

				if (admin_modify_ctrl.noErrCheck(data)){
					ajaxService.put('/admin/modify/', data)
						.then(function(successResponse) {
							for (var key in admin_modify_ctrl.putData) {	//clears all data fields when submit is pressed
								admin_modify_ctrl.putData[key] = '';
							}
							admin_modify_ctrl.newProgramName = admin_modify_ctrl.newProgramRotation = '';	//clears new program addition field
							admin_modify_ctrl.modifyProgramName = admin_modify_ctrl.modifyProgramRotation = ''; //clears modify program fields
							admin_modify_ctrl.turnShowModifyBtnOn();
							admin_modify_ctrl.turnEditOff();	//after success submit changes, edit and the rest of ng-ifs are off
							turnOff.forEach(function(eachTarget) {
								admin_modify_ctrl[eachTarget] = false;
							});
							toastFactory.sucessEdit();
							console.log(successResponse);
						}, function(failureResponse) {	//could add a failure toast
							toastFactory.errorToast('Sorry, an error has occured');
							console.log(failureResponse);
						});
				}
			};

/*
SHOWING THE MODIFY BUTTON IN VIEW
AND TURNING OFF THE EDIT FIELD FOR EACH INDIVIDUAL CATEGORY 
*/			
			admin_modify_ctrl.turnShowModifyBtnOn = function() {
				var turnOn = [
					'showModifyNameBtn',
					'showModifyNumberBtn',
					'showModifySsnBtn',
					'showModifyAddressBtn',
					'showModifyEmailBtn',
					'showModifyTuitionPaidBtn',
					'showModifyMarketingSurveyBtn',
					'showModifyGraduateBtn',
					'showModifyPassedExamBtn',
					'showModifyNumberofTriesBtn',
					'showModifyNoPassReasonBtn',
					'showModifyJobPlacedBtn',
					'showModifyWeeklyWorkHoursBtn',
					'showModifyPayRateBtn',
					'showModifyJobDescriptionBtn',
					'showModifyNoJobReasonBtn',
					'showModifyNotGraduatingReasonBtn'

				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
			};

			admin_modify_ctrl.turnEditOff = function() {
				var turnOff = [	//all the edit fields except programs
					'editNameFieldOn',
					'editPhoneFieldOn',
					'editSsnFieldOn',
					'editAddressFieldOn',
					'editEmailFieldOn',
					'editTuitionPaidFieldOn',
					'editMarketingSurveyFieldOn',
					'editGraduateFieldOn',
					'editPassedExamFieldOn',
					'editNumberOfTriesFieldOn',
					'editNoPassReasonFieldOn',
					'editJobPlacedFieldOn',
					'editWeeklyWorkingHoursFieldOn',
					'editPayRateFieldOn',
					'editJobDescriptionFieldOn',
					'editNoJobReasonFieldOn',
					'editNotGraduatingReasonFieldOn'
				];

				turnOff.forEach(function(eachTarget) {	//turning each edit to false
					admin_modify_ctrl[eachTarget] = false;
				});
			};

//RUNNING THE NECESSARY FUNCTIONS FOR VIEW 
			admin_modify_ctrl.turnEditOff();	//this is edit function which turns all show edit fields off
			admin_modify_ctrl.turnShowModifyBtnOn();	//this turns all modify btn on if admin


/*
	ngif in the view for showing cancel Program Edit button condition
	ngif in the view for showing submit changes button condition
	ngif in the view for showing final cancel button condition
*/
			admin_modify_ctrl.cancelProgramEditCondition = function() {	
				if (admin_modify_ctrl.showModifyThisProgramBtn || 
					(admin_modify_ctrl.showModifyCurrentProgramInputNBtn && admin_modify_ctrl.showModifyCurrentProgramInputNBtn[0]) ||
					 admin_modify_ctrl.showAddNewProgramField || 
					 admin_modify_ctrl.showDeleteProgramBtn)
					return true;
				else return false;
			};

			admin_modify_ctrl.showSubmitChangesCondition = function() {	//could potentially switch to switch statement, performance boost?

				if (admin_modify_ctrl.editNameFieldOn ||
					admin_modify_ctrl.editPhoneFieldOn ||
					admin_modify_ctrl.editSsnFieldOn ||
					admin_modify_ctrl.editAddressFieldOn ||
					admin_modify_ctrl.editEmailFieldOn ||
					admin_modify_ctrl.editTuitionPaidFieldOn ||
					admin_modify_ctrl.editMarketingSurveyFieldOn ||
					admin_modify_ctrl.editGraduateFieldOn ||
					admin_modify_ctrl.editPassedExamFieldOn ||
					admin_modify_ctrl.editNumberOfTriesFieldOn ||
					admin_modify_ctrl.editNoPassReasonFieldOn ||
					admin_modify_ctrl.editJobPlacedFieldOn ||
					admin_modify_ctrl.editWeeklyWorkingHoursFieldOn ||
					admin_modify_ctrl.editPayRateFieldOn ||
					admin_modify_ctrl.editJobPlacedFieldOn ||
					admin_modify_ctrl.editNoJobReasonFieldOn ||
					admin_modify_ctrl.editNotGraduatingReasonFieldOn ||
					admin_modify_ctrl.showSubmitChangesBtn)
					return true;
				else return false;
			};

			admin_modify_ctrl.showFinalCancelCondition = function() {

				if (admin_modify_ctrl.editNameFieldOn ||
					admin_modify_ctrl.editPhoneFieldOn ||
					admin_modify_ctrl.editSsnFieldOn ||
					admin_modify_ctrl.editAddressFieldOn ||
					admin_modify_ctrl.editEmailFieldOn ||
					admin_modify_ctrl.editTuitionPaidFieldOn ||
					admin_modify_ctrl.editMarketingSurveyFieldOn ||
					admin_modify_ctrl.editGraduateFieldOn ||
					admin_modify_ctrl.editPassedExamFieldOn ||
					admin_modify_ctrl.editNumberOfTriesFieldOn ||
					admin_modify_ctrl.editNoPassReasonFieldOn ||
					admin_modify_ctrl.editJobPlacedFieldOn ||
					admin_modify_ctrl.editWeeklyWorkingHoursFieldOn ||
					admin_modify_ctrl.editPayRateFieldOn ||
					admin_modify_ctrl.editJobPlacedFieldOn ||
					admin_modify_ctrl.editNoJobReasonFieldOn ||
					admin_modify_ctrl.editNotGraduatingReasonFieldOn ||
					admin_modify_ctrl.showFinalCancelBtn)
					return true;
				else return false;
			};

/*
	Button functions that turns on or off the view 
	for edit fields/or other action buttons
*/

			admin_modify_ctrl.editCurrentProgramBtn = function() {
				var turnOn = [
					'showModifyThisProgramBtn',
					'showDeleteProgramBtn',
					'showSubmitProgramModificationBtn',
					'showAddProgramBtn'	//need to add show delete button, and add button.	//after those buttons are pressed, show a submit changes button, and turn off final submit changes button
				];
				var turnOff = [
					// 'showDeleteProgramBtn',
					'showSubmitChangesBtn'
				];

				// //turning off attribute	
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});
				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});

				admin_modify_ctrl.parentScope.studentDetail.program.forEach(function(eachProgram) {
					admin_modify_ctrl.editProgramArr.push(eachProgram);	//copying the original program into edit array.
				});

			};

			admin_modify_ctrl.addNewProgramBtn = function() {
				var turnOn = [
					'showAddNewProgramField'
				];
				var turnOff = [
					'showDeleteProgramBtn',
					'showSubmitChangesBtn'
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
					'showSubmitChangesBtn'
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

			admin_modify_ctrl.modifyThisProgramBtn = function(selectedProgram) {
				var programIndex = admin_modify_ctrl.editProgramArr.indexOf(selectedProgram);
				var turnOff = [
					'showModifyThisProgramBtn',
					'showFinalCancelBtn',
					'showSubmitChangesBtn'
				];

				//turning on attribute
				admin_modify_ctrl.showModifyCurrentProgramInput[programIndex] = true;
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});
			};

			admin_modify_ctrl.programModifyCancel = function() {
				var turnOn = [
					'showFinalCancelBtn'
				];
				var turnOff = [
					'showModifyThisProgramBtn',
					'showAddNewProgramField',
					'showDeleteProgramBtn',
					'showAddProgramBtn'
				];

				//turning on attribute
				turnOn.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = true;
				});
				admin_modify_ctrl.turnShowModifyBtnOn();
				//turning off attributes
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				//turning off show modify current program input and button
				admin_modify_ctrl.showModifyCurrentProgramInput.forEach(function(value) {
					value = false;
				});

				
			};

			admin_modify_ctrl.finalCancelBtn = function() {
				var turnOff = [
					'showModifyThisProgramBtn',
					'showDeleteProgramBtn',
					'showAddNewProgramField',
					'showModifyThisProgramBtn'
				];
				turnOff.forEach(function(eachTarget) {
					admin_modify_ctrl[eachTarget] = false;
				});

				admin_modify_ctrl.turnEditOff();
			};

/*
	Other action button functionalities. 
*/
//this functionality needs to be changed, where we modify the new program array with each program obj, and returning that array, and never touching the original program arr
			admin_modify_ctrl.modifyProgram = function(programObj) {	//to be used by submit modification button; controller function logic below
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;
				originalProgram.forEach(function(eachProgram) {
					if (eachProgram.programName !== programObj.programName)	return;	//skip to next program obj if its not matched
					else{	//once matched update the program name and rotation field with ng-model in view
						if (admin_modify_ctrl.modifyProgramName)	eachProgram.programName = admin_modify_ctrl.modifyProgramName;
						if (admin_modify_ctrl.modifyProgramRotation)	eachProgram.programRotation = admin_modify_ctrl.modifyProgramRotation;
					}
					admin_modify_ctrl.submitChangesBtn();	//finally call submit changes again for data to be saved in db, meaning one modification can happen per time.

				});
			};

			admin_modify_ctrl.submitModificationBtn = function(programToBeModified) {
				var programIndex = admin_modify_ctrl.editProgramArr.indexOf(programToBeModified);
				// //modify program
				// admin_modify_ctrl.modifyProgram(programToBeModified);
				admin_modify_ctrl.submitChangesBtn();
				//turn modify current program input and btn off
				admin_modify_ctrl.showModifyCurrentProgramInput[programIndex] = false;
			};

			admin_modify_ctrl.deleteThisProgramBtn = function(programObj) {
				//delete program
				var originalProgram = admin_modify_ctrl.parentScope.studentDetail.program;	//accessing parent controller
				console.log(originalProgram);
				originalProgram = originalProgram.filter(function(eachProgram) {
					return eachProgram.programName !== programObj.programName;	//returning only obj that dont match with parameter obj, thus deleting that from array
				});
				admin_modify_ctrl.submitChangesBtn();	//calling submitChanges so changes can be submmited to database
			};

			admin_modify_ctrl.submitNewProgramBtn = function() {
				admin_modify_ctrl.submitChangesBtn();	
			};

		}

}());
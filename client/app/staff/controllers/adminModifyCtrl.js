(function() {
	'use strict';

	angular.module('myApp.admin')
		.controller('adminModifyController', ['$rootScope', '$scope', 'ajaxService', 'toastFactory', adminModifyControllerHandler]);

		function adminModifyControllerHandler($rootScope, $scope, ajaxService, toastFactory) {
			var admin_modify_ctrl                          = this;
			admin_modify_ctrl.parentScope                  = $scope.admin_search_ctrl;	//accessing admin_search_ctrl
			admin_modify_ctrl.showModifyCurrentProgramInput= []; //inititalize empty arr for program input edit				
			admin_modify_ctrl.editProgramArr               = [];	////need to initialize program edit array obj
			admin_modify_ctrl.putData                      = {	//initialize data object and all necessary keys for PUT request in submitChangesBtn()
				name               : '',
				phoneNumber        : '',
				ssn                : '',
				address            : '',
				email              : '',
				program            : [],
				tuitionPaid        : '',
				marketingSurvey    : '',
				graduate           : '',
				passedExam         : '',
				numberOfTries      : '',
				noPassReason       : '',
				jobPlaced          : '',
				weeklyWorkHours    : '',
				payRate            : '',
				jobDescription     : '',
				noJobReason        : '',
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
			
			admin_modify_ctrl.putChangesFilter = function(data) {
				var putDataAfterFilter = {};
				var originalName = $scope.admin_search_ctrl.studentDetail.name;
				for (var inputField in data) {	//first we filter through the fields that is being editted
					if (inputField === 'program'){	//if data inputField = program
						if (admin_modify_ctrl.editProgramArr[0])	//if the editProgramArr has content
							putDataAfterFilter[inputField] = admin_modify_ctrl.editProgramArr; //equating the two
					}	//for the rest of the fields, we filter through the ones that is editted
					else if (data[inputField] !== '' && data[inputField] !== 'noneSelected')	putDataAfterFilter[inputField] = data[inputField];		
				}

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

/*
	err check function, returns true if no err, and false if there is err
	this way ajax wont be called unless this following function returns true
*/

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
				if (dataTobeChecked.program && dataTobeChecked.program[0]){
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

				if (admin_modify_ctrl.noErrCheck(data)){	//err check
					ajaxService.put('/admin/modify/', data)
						.then(function(successResponse) {
							for (var key in admin_modify_ctrl.putData) {	//clears all data fields when submit is pressed
								if (key === 'program')
								admin_modify_ctrl.putData[key] = '';
							}
							admin_modify_ctrl.newProgramName = admin_modify_ctrl.newProgramRotation = '';	//clears new program addition field
							admin_modify_ctrl.modifyProgramName = admin_modify_ctrl.modifyProgramRotation = ''; //clears modify program fields
							admin_modify_ctrl.turnShowModifyBtnOn();	//turning on the modify button views
							admin_modify_ctrl.turnEditOff();	//after success submit changes, edit and the rest of ng-ifs are off
							admin_modify_ctrl.programModifyCancel();
							toastFactory.sucessEdit();
							console.log(successResponse);
						}, function(failureResponse) {	//could add a failure toast
							toastFactory.errorToast('Sorry, an error has occured');
							console.log(failureResponse);
						});
				}
			};

/*
	User Delete Button
*/

			admin_modify_ctrl.delete = function() {
				//grab user id
				var id = admin_modify_ctrl.parentScope.studentDetail._id;
				//delete request ajax call
				//confirmation
				var confirmation = confirm('Are you sure you want to delete this user?');
				if (confirmation) {
					//ajax
					ajaxService.delete('/admin/delete/' + id)
						.then(function(successResponse) {
							toastFactory.sucessDelete();	//toast
							console.log('delete success: ', successResponse);
					}, 
						function(failureResponse) {
							console.log('delete failed: ', failureResponse);
					});
				}
			};

/*
SHOWING THE MODIFY BUTTON IN VIEW
AND TURNING OFF THE EDIT FIELD FOR EACH INDIVIDUAL CATEGORY 
*/			
			admin_modify_ctrl.turnShowModifyBtnOn = function() {
				admin_modify_ctrl.showModifyNameBtn               = true;
				admin_modify_ctrl.showModifyNumberBtn             = true;
				admin_modify_ctrl.showModifySsnBtn                = true;
				admin_modify_ctrl.showModifyAddressBtn            = true;
				admin_modify_ctrl.showModifyEmailBtn              = true;
				admin_modify_ctrl.showModifyTuitionPaidBtn        = true;
				admin_modify_ctrl.showModifyMarketingSurveyBtn    = true;
				admin_modify_ctrl.showModifyGraduateBtn           = true;
				admin_modify_ctrl.showModifyPassedExamBtn         = true;
				admin_modify_ctrl.showModifyNumberofTriesBtn      = true;
				admin_modify_ctrl.showModifyNoPassReasonBtn       = true;
				admin_modify_ctrl.showModifyJobPlacedBtn          = true;
				admin_modify_ctrl.showModifyWeeklyWorkHoursBtn    = true;
				admin_modify_ctrl.showModifyPayRateBtn            = true;
				admin_modify_ctrl.showModifyJobDescriptionBtn     = true;
				admin_modify_ctrl.showModifyNoJobReasonBtn        = true;
				admin_modify_ctrl.showModifyNotGraduatingReasonBtn= true;
			};

			admin_modify_ctrl.turnEditOff = function() {
				admin_modify_ctrl.editNameFieldOn               = false;
				admin_modify_ctrl.editPhoneFieldOn              = false;
				admin_modify_ctrl.editSsnFieldOn                = false;
				admin_modify_ctrl.editAddressFieldOn            = false;
				admin_modify_ctrl.editEmailFieldOn              = false;
				admin_modify_ctrl.editTuitionPaidFieldOn        = false;
				admin_modify_ctrl.editMarketingSurveyFieldOn    = false;
				admin_modify_ctrl.editGraduateFieldOn           = false;
				admin_modify_ctrl.editPassedExamFieldOn         = false;
				admin_modify_ctrl.editNumberOfTriesFieldOn      = false;
				admin_modify_ctrl.editNoPassReasonFieldOn       = false;
				admin_modify_ctrl.editJobPlacedFieldOn          = false;
				admin_modify_ctrl.editWeeklyWorkingHoursFieldOn = false;
				admin_modify_ctrl.editPayRateFieldOn            = false;
				admin_modify_ctrl.editJobDescriptionFieldOn     = false;
				admin_modify_ctrl.editNoJobReasonFieldOn        = false;
				admin_modify_ctrl.editNotGraduatingReasonFieldOn= false;
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
					(admin_modify_ctrl.showModifyCurrentProgramInput && admin_modify_ctrl.showModifyCurrentProgramInput[0]) ||
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
				// //turning off attribute	
				admin_modify_ctrl.showSubmitChangesBtn            = false;
				//turning on attribute
				admin_modify_ctrl.showModifyThisProgramBtn        = true;
				admin_modify_ctrl.showDeleteProgramBtn            = true;
				admin_modify_ctrl.showSubmitProgramModificationBtn= true;
				admin_modify_ctrl.showAddProgramBtn               = true;
				// copying the original program array into the the edit program array
				admin_modify_ctrl.parentScope.studentDetail.program.forEach(function(eachProgram) {
					admin_modify_ctrl.editProgramArr.push(eachProgram);	//copying the original program into edit array.
				});

			};

			admin_modify_ctrl.modifyThisProgramBtn = function(selectedProgram) {
				var programIndex = admin_modify_ctrl.editProgramArr.indexOf(selectedProgram);
				//turning on attribute
				admin_modify_ctrl.showModifyCurrentProgramInput[programIndex]= true;
				//turning off attributes
				admin_modify_ctrl.showModifyThisProgramBtn                   = false;
				admin_modify_ctrl.showFinalCancelBtn                         = false;
				admin_modify_ctrl.showSubmitChangesBtn                       = false;
			};

			admin_modify_ctrl.programModifyCancel = function() {

				// //turning on attribute
				admin_modify_ctrl.showFinalCancelBtn              = true;
				admin_modify_ctrl.turnShowModifyBtnOn();
				//turning off attributes
				admin_modify_ctrl.showModifyThisProgramBtn        = false;
				admin_modify_ctrl.showSubmitProgramModificationBtn= false;
				admin_modify_ctrl.showAddNewProgramField          = false;
				admin_modify_ctrl.showDeleteProgramBtn            = false;
				admin_modify_ctrl.showAddProgramBtn               = false;

				//turning off show modify current program input and button
				for (var i = 0; i <= admin_modify_ctrl.showModifyCurrentProgramInput.length - 1; i++){
					admin_modify_ctrl.showModifyCurrentProgramInput[i] =  false;
				}
				
			};

			admin_modify_ctrl.finalCancelBtn = function() {
				//turning off attributes
				admin_modify_ctrl.showModifyThisProgramBtn= false;
				admin_modify_ctrl.showDeleteProgramBtn    = false;
				admin_modify_ctrl.showAddNewProgramField  = false;
				admin_modify_ctrl.showModifyThisProgramBtn= false;
				//turn all edit field off
				admin_modify_ctrl.turnEditOff();
			};

/*
	Other action button functionalities. 
*/


			admin_modify_ctrl.submitModificationBtn = function(programToBeModified) {
				var programIndex = admin_modify_ctrl.editProgramArr.indexOf(programToBeModified);
				// //modify program
				admin_modify_ctrl.submitChangesBtn();
				//turn modify current program input and btn off
				admin_modify_ctrl.showModifyCurrentProgramInput[programIndex] = false;
			};

			admin_modify_ctrl.addProgramBtn = function() {
				//creat a new program obj
				var newProgram = {};
				//fill program obj with key value pairs
				newProgram.programName = admin_modify_ctrl.newProgramName;
				newProgram.programRotation = admin_modify_ctrl.newProgramRotation;
				//push this new program into the edit arr
				admin_modify_ctrl.editProgramArr.push(newProgram);
				//submit the changes
				admin_modify_ctrl.submitChangesBtn();
			};

			admin_modify_ctrl.deleteThisProgramBtn = function(programObj) {

				admin_modify_ctrl.editProgramArr = admin_modify_ctrl.editProgramArr.filter(function(eachProgram) {
					return eachProgram.programName !== programObj.programName;	//returning only obj that dont match with parameter obj, thus deleting that from array
				});
				admin_modify_ctrl.submitChangesBtn();	//calling submitChanges so changes can be submmited to database
			};

			admin_modify_ctrl.submitNewProgramBtn = function() {
				admin_modify_ctrl.submitChangesBtn();	
			};

		}

}());
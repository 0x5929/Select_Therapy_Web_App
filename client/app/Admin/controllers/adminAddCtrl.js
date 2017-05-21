(function() {

//NEED TO ADD ERROR HANDLING FOR THESE ADD FIELDS, CANCEL SUBMIT AND PROMPT ERR TOAST MESSAGE

	'use strict';

	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', '$stateParams', '$filter', 'ajaxService', 'toastFactory', 'studentValue', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, $stateParams, $filter, ajaxService, toastFactory, studentValue) {	//may want to delete filter, it does nothin

			var admin_add_ctrl = this;
			var postData = null;

			admin_add_ctrl.programInputCount = 0;
			admin_add_ctrl.googleSync = false;

			admin_add_ctrl.ngSelectOption = {	//initialize ng select option to be initially false
				programs: [{	//1st program
					CNA      : false,
					HHA      : false,
					SG       : false,
					ESOL     : false,
					caregiver: false
				}, {	//2nd program
					CNA      : false,
					HHA      : false,
					SG       : false,
					ESOL     : false,
					caregiver: false					
				}, {	//3rd program
					CNA      : false,
					HHA      : false,
					SG       : false,
					ESOL     : false,
					caregiver: false					
				}, {	//4th program
					CNA      : false,
					HHA      : false,
					SG       : false,
					ESOL     : false,
					caregiver: false					
				}, {	//5th program
					CNA      : false,
					HHA      : false,
					SG       : false,
					ESOL     : false,
					caregiver: false					
				}],	//rest of options
				tuitionPaidTrue     : false,
				tuitionPaidFalse    : false,
				graduateTrue        : false,
				graduateFalse       : false,
				stillInProgram      : false,
				droppedTheProgram   : false,
				missingClinical     : false,
				missingTheroy       : false,
				didnNotFinishPayment: false,
				marketingSurvey     : false,
				jobPlaced           : false,
				weeklyWorkHours     : false,
				passedExam          : false,
				didNotpassExam      : false,
				firstTry            : false,
				secondTry           : false,
				thirdTry            : false,
				haveNotTakenExam    : false,
				failedTheory        : false,
				failedSkills        : false,
				fullTime            : false,
				partTime            : false,
				chineseInLa         : false,
				worldJournal        : false,
				craigslist          : false,
				referredByFriend    : false,
				marketingNone       : false
			};


			admin_add_ctrl.studentModel = {	//initialize student model with all the necessary required fields
				firstName          : '',
				lastName           : '',
				studentID          : '',
				enrollmentDate     : '',
				phoneNumber        : '',
				ssn                : '',
				address            : '',
				email              : '',
				tuition            : '',
				tuitionPaid        : 'noneSelected',
				graduate           : 'noneSelected',
				notGraduatingReason: 'noneSelected',
				marketingSurvey    : 'noneSelected',
				jobPlaced          : 'noneSelected',
				weeklyWorkHours    : 'noneSelected',
				passedExam         : 'noneSelected',
				numberOfTries      : 'noneSelected',
				noPassReason       : 'noneSelected',
				program: [
					{
						programName    : 'noneSelected',
						programRotation: ''
					},
					{
						programName    : 'noneSelected',
						programRotation: ''
					},
					{
						programName    : 'noneSelected',
						programRotation: ''
					},
					{
						programName    : 'noneSelected',
						programRotation: ''
					},
					{
						programName    : 'noneSelected',
						programRotation: ''
					}
				]
			};	
			//first check if state params is modifying
			//if so we need to fill in all the ng models with studentvalue service

			if ($stateParams.func && $stateParams.func === 'modify') {
				console.log(studentValue);
				for (var studentModelKey in admin_add_ctrl.studentModel){
					for (var studentValueKey in studentValue){
						if (studentModelKey === studentValueKey)
							admin_add_ctrl.studentModel[studentModelKey] = studentValue[studentValueKey];
					}
				}
				console.log(admin_add_ctrl.studentModel);
			}

/*
		NG SELECT FUNCTION:
		need to have a for in loop for all the keys in admin student model, 
		and return true for each option depending on the student model value,
		and final else needs to return true for the ng select function at each key
		this way this function is evaluated at each key, and returning true for 
		default nonselected or disabled value if there is no value at student model

		ABOVE IS ONLY FOR MODIFY
 		
*/




			admin_add_ctrl.ngSelect = function(params) {
				if ($stateParams.func === 'modify'){	//program select options
					switch (params) 
					{
						case 'firstProgram':{
							if (admin_add_ctrl.studentModel.program[0]){
								if (admin_add_ctrl.studentModel.program[0]['programName'] === 'CNA')
									return admin_add_ctrl.ngSelectOption.programs[0]['CNA'] = true;
								else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'HHA')
									return admin_add_ctrl.ngSelectOption.programs[0]['HHA'] = true;
								else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'SG')
									return admin_add_ctrl.ngSelectOption.programs[0]['SG']  = true;
								else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'ESOL')
									return admin_add_ctrl.ngSelectOption.programs[0]['ESOL']  = true;
								else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'caregiver')
									return admin_add_ctrl.ngSelectOption.programs[0]['caregiver']  = true;								
							}else return true;
						}
						case 'secondProgram':{
							if (admin_add_ctrl.studentModel.program[1]){
								if (admin_add_ctrl.studentModel.program[1]['programName'] === 'CNA')
									return admin_add_ctrl.ngSelectOption.programs[1]['CNA'] = true;
								else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'HHA')
									return admin_add_ctrl.ngSelectOption.programs[1]['HHA'] = true;
								else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'SG')
									return admin_add_ctrl.ngSelectOption.programs[1]['SG']  = true;
								else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'ESOL')
									return admin_add_ctrl.ngSelectOption.programs[1]['ESOL']  = true;
								else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'caregiver')
									return admin_add_ctrl.ngSelectOption.programs[1]['caregiver']  = true;								
							}else return true;
						}
						case 'thirdProgram':{
							if (admin_add_ctrl.studentModel.program[2]){
								if (admin_add_ctrl.studentModel.program[2]['programName'] === 'CNA')
									return admin_add_ctrl.ngSelectOption.programs[2]['CNA'] = true;
								else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'HHA')
									return admin_add_ctrl.ngSelectOption.programs[2]['HHA'] = true;
								else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'SG')
									return admin_add_ctrl.ngSelectOption.programs[2]['SG']  = true;
								else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'ESOL')
									return admin_add_ctrl.ngSelectOption.programs[2]['ESOL']  = true;
								else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'caregiver')
									return admin_add_ctrl.ngSelectOption.programs[2]['caregiver']  = true;								
							}else return true;
						}
						case 'fourthProgram':{
							if (admin_add_ctrl.studentModel.program[3]){
								if (admin_add_ctrl.studentModel.program[3]['programName'] === 'CNA')
									return admin_add_ctrl.ngSelectOption.programs[3]['CNA'] = true;
								else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'HHA')
									return admin_add_ctrl.ngSelectOption.programs[3]['HHA'] = true;
								else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'SG')
									return admin_add_ctrl.ngSelectOption.programs[3]['SG']  = true;
								else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'ESOL')
									return admin_add_ctrl.ngSelectOption.programs[3]['ESOL']  = true;
								else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'caregiver')
									return admin_add_ctrl.ngSelectOption.programs[3]['caregiver']  = true;								
							}else return true;
						}
						case 'fifthProgram':{
							if (admin_add_ctrl.studentModel.program[4]){
								if (admin_add_ctrl.studentModel.program[4]['programName'] === 'CNA')
									return admin_add_ctrl.ngSelectOption.programs[4]['CNA'] = true;
								else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'HHA')
									return admin_add_ctrl.ngSelectOption.programs[4]['HHA'] = true;
								else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'SG')
									return admin_add_ctrl.ngSelectOption.programs[4]['SG']  = true;
								else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'ESOL')
									return admin_add_ctrl.ngSelectOption.programs[4]['ESOL']  = true;
								else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'caregiver')
									return admin_add_ctrl.ngSelectOption.programs[4]['caregiver']  = true;								
							}else return true;
						}
						case 'tuitionPaid':{
							if (admin_add_ctrl.studentModel.tuitionPaid === true)
								return admin_add_ctrl.ngSelectOption.tuitionPaidTrue = true;
							else if (admin_add_ctrl.studentModel.tuitionPaid === false)
								return admin_add_ctrl.ngSelectOption.tuitionPaidFalse = true;
							else return true;
						}
						case 'graduate': {
							if (admin_add_ctrl.studentModel.graduate === true)
								return admin_add_ctrl.ngSelectOption.graduateTrue = true;
							else if (admin_add_ctrl.studentModel.graduate === false)
								return admin_add_ctrl.ngSelectOption.graduateFalse = true;	
							else return true;						
						}
						case 'notGraduatingReason': {
							if (admin_add_ctrl.studentModel.notGraduatingReason === 'Still_in_program')
								return admin_add_ctrl.ngSelectOption.stillInProgram = true;
							else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Dropped_the_program')
								return admin_add_ctrl.ngSelectOption.droppedTheProgram = true;
							else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Missing_clinical_hours')
								return admin_add_ctrl.ngSelectOption.missingClinical = true;
							else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Missing_theory_hours')
								return admin_add_ctrl.ngSelectOption.missingTheroy = true;
							else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Did_not_finish_payment')
								return admin_add_ctrl.ngSelectOption.didnNotFinishPayment = true;	
							else return true;						
						}
						case 'passedExam': {
							if (admin_add_ctrl.studentModel.passedExam === true)
								return admin_add_ctrl.ngSelectOption.passedExam = true;
							else if (admin_add_ctrl.studentModel.passedExam === false) 
								return admin_add_ctrl.ngSelectOption.didNotpassExam = true;		
							else return true;					
						}
						case 'numberOfTries': {
							if (admin_add_ctrl.studentModel.numberOfTries === 1)
								return admin_add_ctrl.ngSelectOption.firstTry = true;
							else if (admin_add_ctrl.studentModel.numberOfTries === 2)
								return admin_add_ctrl.ngSelectOption.secondTry = true;
							else if (admin_add_ctrl.studentModel.numberOfTries === 3)
								return admin_add_ctrl.ngSelectOption.thirdTry = true;		
							else return true;					
						}
						case 'noPassReason': {
							if (admin_add_ctrl.studentModel.noPassReason === 'Have_not_taken_the_exam')
								return admin_add_ctrl.ngSelectOption.haveNotTakenExam = true;
							else if (admin_add_ctrl.studentModel.noPassReason === 'Failed_theory')	
								return admin_add_ctrl.ngSelectOption.failedTheory = true;
							else if (admin_add_ctrl.studentModel.noPassReason === 'Failed_skills')	
								return admin_add_ctrl.ngSelectOption.failedSkills = true;	
							else return true;			
						}
						case 'jobPlaced': {
							if (admin_add_ctrl.studentModel.jobPlaced === true)
								return admin_add_ctrl.ngSelectOption.employed = true;
							else if (admin_add_ctrl.studentModel.jobPlaced === false)
								return admin_add_ctrl.ngSelectOption.unemployed = true;
							else return true;							
						}
						case 'weeklyWorkHours': {
							if (admin_add_ctrl.studentModel.weeklyWorkHours === 'fullTimePos')
								return admin_add_ctrl.ngSelectOption.fullTime = true;
							else if (admin_add_ctrl.studentModel.weeklyWorkHours === 'partTimePos')
								return admin_add_ctrl.ngSelectOption.partTime = true;
							else return true;
						}
						case 'marketingSurvey': {
							if (admin_add_ctrl.studentModel.marketingSurvey === 'Chinese_In_LA')
								return admin_add_ctrl.ngSelectOption.chineseInLa = true;
							else if (admin_add_ctrl.studentModel.marketingSurvey === 'World_Journal')
								return admin_add_ctrl.ngSelectOption.worldJournal = true;
							else if (admin_add_ctrl.studentModel.marketingSurvey === 'Craigslist')
								return admin_add_ctrl.ngSelectOption.craigslist = true;
							else if (admin_add_ctrl.studentModel.marketingSurvey === 'Referred_By_Friend')
								return admin_add_ctrl.ngSelectOption.referredByFriend = true;
							else if (admin_add_ctrl.studentModel.marketingSurvey === 'None')
								return admin_add_ctrl.ngSelectOption.marketingNone = true;
							else return true;
						}
					}
				}else return true;
			};







			admin_add_ctrl.noErrorCheck = function(dataTobeChecked) {	//possibly encapsulate this into a service to be used again in adminModify to check for errs
			//err conditions

				if (!isNaN(dataTobeChecked.name)){
					toastFactory.errorToast("please check the student's first and last name input");
					return false;
				}
				if (isNaN(dataTobeChecked.phoneNumber) || dataTobeChecked.phoneNumber.length !== 10){	//phone number and ssn is taken care of by masked input
					toastFactory.errorToast("please check the student's phone number input");
					return false;
				}
				if (isNaN(dataTobeChecked.ssn) || dataTobeChecked.ssn.length !== 9){
					toastFactory.errorToast("please check the student's ssn input");
					return false;
				}
				if (!isNaN(dataTobeChecked.address)){
					toastFactory.errorToast("please check the student's address input");
					return false;
				}
				if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(dataTobeChecked.email))) {
					toastFactory.errorToast("please enter a valid email");
					return false;
				}
				for (var i = 0; i < dataTobeChecked.program.length; i++){
					if (!(dataTobeChecked.program[i]['programName'])){
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
							return false;
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

			admin_add_ctrl.submit = function() {
				
				postData      = {
				enrollmentDate: new Date(admin_add_ctrl.studentModel.enrollmentDate).toISOString().slice(0,10),	//need to add for the rest
				studentID     : admin_add_ctrl.studentModel.studentID,
				firstName     : admin_add_ctrl.studentModel.firstName,
				lastName      : admin_add_ctrl.studentModel.lastName,
				// name       : admin_add_ctrl.firstName + ' ' + admin_add_ctrl.lastName,
				phoneNumber   : admin_add_ctrl.studentModel.phoneNumber,
				ssn           : admin_add_ctrl.studentModel.ssn,
				address       : admin_add_ctrl.studentModel.address,
				email         : admin_add_ctrl.studentModel.email,
				program: [{
					programName    : admin_add_ctrl.studentModel.program[0]['programName'],
					programRotation: admin_add_ctrl.studentModel.program[0]['programRotation']
				}, {
					programName    : admin_add_ctrl.studentModel.program[1]['programName'],
					programRotation: admin_add_ctrl.studentModel.program[1]['programRotation']
				}, {
					programName    : admin_add_ctrl.studentModel.program[2]['programName'],
					programRotation: admin_add_ctrl.studentModel.program[2]['programRotation']
				}, {
					programName    : admin_add_ctrl.studentModel.program[3]['programName'],
					programRotation: admin_add_ctrl.studentModel.program[3]['programRotation']
				}, {
					programName    : admin_add_ctrl.studentModel.program[4]['programName'],
					programRotation: admin_add_ctrl.studentModel.program[4]['programRotation']
				}],
				graduate           : admin_add_ctrl.studentModel.graduate,
				notGraduatingReason: admin_add_ctrl.studentModel.notGraduatingReason,
				tuition            : admin_add_ctrl.studentModel.tuition,
				tuitionPaid        : admin_add_ctrl.studentModel.tuitionPaid,
				jobPlaced          : admin_add_ctrl.studentModel.jobPlaced,
				weeklyWorkHours    : admin_add_ctrl.studentModel.weeklyWorkHours,
				payRate            : admin_add_ctrl.studentModel.payRate,
				jobDescription     : admin_add_ctrl.studentModel.jobDescription,
				noJobReason        : admin_add_ctrl.studentModel.noJobReason,
				passedExam         : admin_add_ctrl.studentModel.passedExam,
				numberOfTries      : admin_add_ctrl.studentModel.numberOfTries,
				noPassReason       : admin_add_ctrl.studentModel.noPassReason,
				marketingSurvey    : admin_add_ctrl.studentModel.marketingSurvey
			};
			//below is to ensure only proper data gets passed into ajax service
				postData.program = postData.program
					.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
					return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
				});
				if (admin_add_ctrl.noErrorCheck(postData)){	//calling error check to ensure proper data going into server
					admin_add_ctrl.dataFilter(postData);
					console.log('testing before data is sent to server: ', postData);
					ajaxService.post('/admin/add/', postData)
					.then(function(successResponse) {
						toastFactory.successAdd(postData.firstName + ' ' +  postData.lastName);
						admin_add_ctrl.refresh();
						console.log('success: ', successResponse);
					}, 
					function(failureResposne) {
						console.log('error: ', failureResposne);
					});
				} 
				
			};

			admin_add_ctrl.dataFilter = function(dataToBeFiltered) {	//to filter through the noneSelected, and change it to empty string to be evaluated as false;
				for (var key in dataToBeFiltered) {
					if ((typeof dataToBeFiltered[key] === 'string' && dataToBeFiltered[key] === 'noneSelected') ||
						typeof dataToBeFiltered[key] === 'undefined')
						dataToBeFiltered[key] = '';
				}
				console.log('testing after data is filtered: ', dataToBeFiltered);
			};

			admin_add_ctrl.refresh = function() {	//could encapsulate all the refresh function into its own factory service
//strings and Numbers				
				admin_add_ctrl.studentModel.enrollmentDate            = '';
				admin_add_ctrl.studentModel.studentID                 = '';
				admin_add_ctrl.studentModel.firstName                 = '';
				admin_add_ctrl.studentModel.lastName                  = '';
				admin_add_ctrl.studentModel.phoneNumber               = '';
				admin_add_ctrl.studentModel.ssn                       = '';
				admin_add_ctrl.studentModel.address                   = '';
				admin_add_ctrl.studentModel.email                     = '';
				admin_add_ctrl.studentModel.payRate                   = '';
				admin_add_ctrl.studentModel.jobDescription            = '';
				admin_add_ctrl.studentModel.noJobReason               = '';
				admin_add_ctrl.studentModel.FirstprogramRotation      = '';
				admin_add_ctrl.studentModel.SecondprogramRotation     = '';
				admin_add_ctrl.studentModel.ThirdprogramRotation      = '';
				admin_add_ctrl.studentModel.ForthprogramRotation      = '';
				admin_add_ctrl.studentModel.FifthprogramRotation      = '';
				
				//setting the necessary ng-if to false	
				admin_add_ctrl.showAddProgramInput1                   = false;
				admin_add_ctrl.showAddProgramInput2                   = false;
				admin_add_ctrl.showAddProgramInput3                   = false;
				admin_add_ctrl.showAddProgramInput4                   = false;
				admin_add_ctrl.showAddProgramInput5                   = false;			
				
				//option value
				admin_add_ctrl.studentModel.marketingSurvey           = 'noneSelected';
				admin_add_ctrl.studentModel.graduate                  = 'noneSelected';
				admin_add_ctrl.studentModel.notGraduatingReason       = 'noneSelected';
				admin_add_ctrl.studentModel.tuitionPaid               = 'noneSelected';
				admin_add_ctrl.studentModel.jobPlaced                 = 'noneSelected';
				admin_add_ctrl.studentModel.weeklyWorkHours           = 'noneSelected';
				admin_add_ctrl.studentModel.passedExam                = 'noneSelected';
				admin_add_ctrl.studentModel.numberOfTries             = 'noneSelected';
				admin_add_ctrl.studentModel.noPassReason              = 'noneSelected';
				admin_add_ctrl.studentModel.program[0]['programName'] = 'noneSelected';
				admin_add_ctrl.studentModel.program[1]['programName'] = 'noneSelected';
				admin_add_ctrl.studentModel.program[2]['programName'] = 'noneSelected';
				admin_add_ctrl.studentModel.program[3]['programName'] = 'noneSelected';
				admin_add_ctrl.studentModel.program[4]['programName'] = 'noneSelected';
			};


			admin_add_ctrl.addProgramInput = function(counter) {	/*admin_add_ctrl.programInputCount gets passed in from view
																		admin_add_ctrl.programInputCount = 0 is initialized at the start 
																		of the controller script, loaded once per reload.
																	*/
				var maxProgramCount = 4;
				var humanCount = counter + 1;

				//update counter
				if (counter < maxProgramCount)	admin_add_ctrl.programInputCount++;
				//set visual to true
				admin_add_ctrl['showAddProgramInput' + humanCount] = true;
				//stopping condition with err message
				if (counter == maxProgramCount)	toastFactory.errorToast("You can only enter up to 5 programs for now");
			};

			admin_add_ctrl.clearProgramInput = function() {		//for the clear input button 
				var maxProgramCount = 4;

				var ngModels = [	//taken care of human counter
					[ 'FirstprogramName', 'FirstprogramRotation' ],
					[ 'SecondprogramName', 'SecondprogramRotation' ],
					[ 'ThirdprogramName', 'ThirdprogramRotation' ],
					[ 'ForthprogramName', 'ForthprogramRotation' ],
					[ 'FifthprogramName', 'FifthprogramRotation' ]
				];

				//clearing all fields
				for (var i = 0; i <= maxProgramCount; i++) {
				var specificNgModelProgramName = ngModels[i][0];
				var specificNgModelProgramRotation = ngModels[i][1];
					admin_add_ctrl[specificNgModelProgramName] = 'noneSelected';	//clearing program name
					admin_add_ctrl[specificNgModelProgramRotation] = '';	//clearing program rotation
				}
				//turn off all visuals
				for (var j = 1; j <= maxProgramCount + 1; j++){	//adding 1 bc of the last program input (fifth) needs to be turned off as well
					admin_add_ctrl[ 'showAddProgramInput' + j ] = false;
				}
				//update counter
				admin_add_ctrl.programInputCount = 0; 

			};


// IF ADMIN IS MODIFYING STUDENT INFO: 
//add a modifying function that will populate all data from search to add


//google sign in:

			admin_add_ctrl.googleSigninBtnID = 'g-signin2';
			admin_add_ctrl.googleSigninOptions = {
				'onsuccess': function(successResponse) {
					console.log(successResponse);
				}
			};			

		}
}());
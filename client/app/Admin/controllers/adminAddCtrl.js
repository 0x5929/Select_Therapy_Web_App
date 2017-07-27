(function() {

//NEED TO ADD ERROR HANDLING FOR THESE ADD FIELDS, CANCEL SUBMIT AND PROMPT ERR TOAST MESSAGE

	'use strict';

	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', '$stateParams', '$filter', 'ajaxService', 'toastFactory', 'studentValue', 'modalFactory', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, $stateParams, $filter, ajaxService, toastFactory, studentValue, modalFactory) {	//may want to delete filter, it does nothin
			
			var admin_add_ctrl               = this;
			var postData                     = null;

			admin_add_ctrl.programInputCount = 0;
			admin_add_ctrl.googleSync        = false;
			admin_add_ctrl.turnOnSyncButton  = false;


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
				payRate		       : '',
				placeOfEmployment  : '',
				employmentAddress  : '',
				jobPosition        : '',
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
						programName     : 'noneSelected',
						programRotation : '',
						programStartDate: '',
						programEndDate  : ''
					},
					{
						programName     : 'noneSelected',
						programRotation : '',
						programStartDate: '',
						programEndDate  : ''
					},
					{
						programName     : 'noneSelected',
						programRotation : '',
						programStartDate: '',
						programEndDate  : ''
					},
					{
						programName     : 'noneSelected',
						programRotation : '',
						programStartDate: '',
						programEndDate  : ''
					},
					{
						programName     : 'noneSelected',
						programRotation : '',
						programStartDate: '',
						programEndDate  : ''
					}
				]
			};	

			//Program constructor

			var Program = function(programName, programRotation, programCost, programStartDate, programEndDate) {
				this.programName = programName;
				this.programRotation = programRotation;
				this.programTuition = programCost;
				this.programStartDate = programStartDate;
				this.programEndDate = programEndDate;
			};

// IF ADMIN IS MODIFYING STUDENT INFO: 
//add a modifying function that will populate all data from search to add


			//first check if state params is modifying
			//if so we need to fill in all the ng models with studentvalue service

			if ($stateParams.func && $stateParams.func === 'modify') {
				var programObj 					 = {	//initalized to be pushed into the program arr
					programName     : 'noneselected',
					programRotation : '',
					programStartDate: '',
					programEndDate  : ''
				};
				for (var studentModelKey in admin_add_ctrl.studentModel){
					for (var studentValueKey in studentValue){
						if (studentModelKey === studentValueKey)
							admin_add_ctrl.studentModel[studentModelKey] = studentValue[studentValueKey];
					}
				}
				//add in an original name key for modifying purposes
				admin_add_ctrl.studentModel.originalName = studentValue.firstName + ' ' + studentValue.lastName;
				console.log('HELLO WORLD DUDE THIS IS ADMIN STUDENT MODEL: ', admin_add_ctrl.studentModel);

				console.log('HELLO WORLD DUDE THIS IS STUDENT value: ', studentValue);
				//need to implement a logic to count how many programs obj in program arr
				//5 - the above number needs to be pushed into the program arr so it can properly reflect the program ng model
				for (var currentProgramNum = admin_add_ctrl.studentModel.program.length; 
					5 - currentProgramNum > 0; currentProgramNum++){
					admin_add_ctrl.studentModel.program.push(programObj);
				}
			}


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

				if (!isNaN(dataTobeChecked.firstName)){	//could do a regex that there is no space
					toastFactory.errorToast("please check the student's first name input");
					return false;
				}
				if (!isNaN(dataTobeChecked.lastName)){
					toastFactory.errorToast("please check the student's last name input");
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
						toastFactory.errorToast("make sure you enter a valid program rotation number");
						return false;
					}
					if (!dataTobeChecked.program[i]['programStartDate']){
						toastFactory.errorToast('make sure you enter a start date for the program');
						return false;
					}
					if (!dataTobeChecked.program[i]['programEndDate']) {
						toastFactory.errorToast('make sure you enter an end date for the program');
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
				if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.placeOfEmployment)){
					toastFactory.errorToast("please check the place of employment field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.employmentAddress)){
					toastFactory.errorToast("please check the employment address field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.jobPosition)){
					toastFactory.errorToast("please check the job jobPosition field");
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

			admin_add_ctrl.dataFilter = function(dataToBeFiltered) {	//to filter through the noneSelected, and change it to empty string to be evaluated as false;
				for (var key in dataToBeFiltered) {
					if ((typeof dataToBeFiltered[key] === 'string' && dataToBeFiltered[key] === 'noneSelected') ||
						typeof dataToBeFiltered[key] === 'undefined')
						dataToBeFiltered[key] = '';
				}
				console.log('testing after data is filtered: ', dataToBeFiltered);
			};


			admin_add_ctrl.submit = function() {
				//NEED TO ALSO MAKE SURE GOOGLE IS PROPERLY AUTHORIZED TO DO ACTIONS
				var postData;

					// params = {
					// 	client_id: '1080610187210-b2d58di99vr262qj9g17vm0jgnncb6bp.apps.googleusercontent.com'
					// };

					// gapi.auth2.init(params);	//initialize google auth
					// auth = gapi.auth2.getAuthInstance();	//returns googleUser Obj
					// //check if user is signed in
					// if (!auth.isSignedIn.get())	return callback('you need to sign in wit google', null);
					// accessToken = auth.currentUser.get().getAuthResponse().access_token;	//grabbing access token
					// configObj = {
					// 	headers: {
					// 		'Authorization': 'Bearer ' + accessToken 
					// 	}
					// }
					// console.log('TESTING ACCESS TOKEN: ', accessToken);		

			console.log('DOES THIS GET RUN?', admin_add_ctrl.studentModel);		
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
						programName     : admin_add_ctrl.studentModel.program[0]['programName'],
						programRotation : admin_add_ctrl.studentModel.program[0]['programRotation'],
						programStartDate: admin_add_ctrl.studentModel.program[0]['programStartDate'],
						programEndDate  : admin_add_ctrl.studentModel.program[0]['programEndDate']
					}, {
						programName     : admin_add_ctrl.studentModel.program[1]['programName'],
						programRotation : admin_add_ctrl.studentModel.program[1]['programRotation'],
						programStartDate: admin_add_ctrl.studentModel.program[1]['programStartDate'],
						programEndDate  : admin_add_ctrl.studentModel.program[1]['programEndDate']
					}, {
						programName     : admin_add_ctrl.studentModel.program[2]['programName'],
						programRotation : admin_add_ctrl.studentModel.program[2]['programRotation'],
						programStartDate: admin_add_ctrl.studentModel.program[2]['programStartDate'],
						programEndDate  : admin_add_ctrl.studentModel.program[2]['programEndDate']
					}, {
						programName     : admin_add_ctrl.studentModel.program[3]['programName'],
						programRotation : admin_add_ctrl.studentModel.program[3]['programRotation'],
						programStartDate: admin_add_ctrl.studentModel.program[3]['programStartDate'],
						programEndDate  : admin_add_ctrl.studentModel.program[3]['programEndDate']
					}, {
						programName     : admin_add_ctrl.studentModel.program[4]['programName'],
						programRotation : admin_add_ctrl.studentModel.program[4]['programRotation'],
						programStartDate: admin_add_ctrl.studentModel.program[4]['programStartDate'],
						programEndDate  : admin_add_ctrl.studentModel.program[4]['programEndDate']
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
					marketingSurvey    : admin_add_ctrl.studentModel.marketingSurvey,
					originalName       : admin_add_ctrl.studentModel.originalName,
					googlePostData	   : admin_add_ctrl.googlePostData()
			};

			console.log('DOES THIS GET RUN?', postData);
			//below is to ensure only proper data gets passed into ajax service
				postData.program = postData.program
					.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
					return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
				});
				if (admin_add_ctrl.noErrorCheck(postData)){	//calling error check to ensure proper data going into server
					admin_add_ctrl.dataFilter(postData);

					console.log('testing before data is sent to server: ', postData);
					makeRequest('/admin/add/', postData, callback);

					function callback(err, successResponse) {
						if (err) {
							console.log('HELLO WORLD ERROR: ', err);
							return toastFactory.errorToast(err);
						}
						console.log('successResponse: ', successResponse);
						return admin_add_ctrl.refresh();							
						
					}

					function makeRequest(URL, data, callback) {
						var params,
							auth,
							accessToken,
							configObj;
						params = {
							client_id: '1080610187210-b2d58di99vr262qj9g17vm0jgnncb6bp.apps.googleusercontent.com'
						};
						gapi.auth2.init(params);	//initialize google auth
						auth = gapi.auth2.getAuthInstance();	//returns googleUser Obj
						//check if user is signed in
						if (!auth.isSignedIn.get())	return callback('you need to sign in wit google', null);
						accessToken = auth.currentUser.get().getAuthResponse().access_token;	//grabbing access token
						configObj = {
							headers: {
								'Authorization': 'Bearer ' + accessToken 
							}
						}
						ajaxService.post('/admin/add/', data, configObj)
							.then(function(successResponse) {
								toastFactory.successAdd(postData.firstName + ' ' +  postData.lastName);	//this could be split between modify or add
								// admin_add_ctrl.refresh();
								callback(null, successResponse);
							}, 
							function(failureResponse) {
								callback(failureResponse.data);
						});						
					}

				} 
				
			};


/*******************************************
			ADD PROGRAM FUNCTIONALITY
			MODAL SETUP AND FUNCTIONS 
********************************************/

			admin_add_ctrl.addProgram = function() {
				//initiate modal
				modalFactory.addProgramModalService();

			};

			admin_add_ctrl.cancelModal = $scope.$dismiss;

			/*
				okModal Function: 
				@params: none atm
				@return void
				{
					using the ngModel for program details, to call program contructor
					pushing the resultant obj into the program array
						-> this will refect on the ngRepeat for program details in the admin add viewhtml
					clearing the ngModels
					closing the modal -> dont need to pass in anything for the modal promise.
				}
			*/

			admin_add_ctrl.okModal = function() {

				//scope.close
				//and pass in ngmodels
				$scop.$close();
			};





			admin_add_ctrl.refresh = function() {	//could encapsulate all the refresh function into its own factory service
//strings and Numbers				
				admin_add_ctrl.studentModel.enrollmentDate                 = '';
				admin_add_ctrl.studentModel.studentID                      = '';
				admin_add_ctrl.studentModel.firstName                      = '';
				admin_add_ctrl.studentModel.lastName                       = '';
				admin_add_ctrl.studentModel.phoneNumber                    = '';
				admin_add_ctrl.studentModel.ssn                            = '';
				admin_add_ctrl.studentModel.address                        = '';
				admin_add_ctrl.studentModel.email                          = '';
				admin_add_ctrl.studentModel.tuition                        = '';
				admin_add_ctrl.studentModel.payRate                        = '';
				admin_add_ctrl.studentModel.placeOfEmployment              = '';
				admin_add_ctrl.studentModel.employmentAddress              = '';
				admin_add_ctrl.studentModel.jobPosition                    = '';
				admin_add_ctrl.studentModel.noJobReason                    = '';
				admin_add_ctrl.studentModel.program[0]['programRotation']  = '';
				admin_add_ctrl.studentModel.program[1]['programRotation']  = '';
				admin_add_ctrl.studentModel.program[2]['programRotation']  = '';
				admin_add_ctrl.studentModel.program[3]['programRotation']  = '';
				admin_add_ctrl.studentModel.program[4]['programRotation']  = '';
				admin_add_ctrl.studentModel.program[0]['programStartDate'] = '';
				admin_add_ctrl.studentModel.program[1]['programStartDate'] = '';
				admin_add_ctrl.studentModel.program[2]['programStartDate'] = '';
				admin_add_ctrl.studentModel.program[3]['programStartDate'] = '';
				admin_add_ctrl.studentModel.program[4]['programStartDate'] = '';
				admin_add_ctrl.studentModel.program[0]['programEndDate']   = '';
				admin_add_ctrl.studentModel.program[1]['programEndDate']   = '';
				admin_add_ctrl.studentModel.program[2]['programEndDate']   = '';
				admin_add_ctrl.studentModel.program[3]['programEndDate']   = '';
				admin_add_ctrl.studentModel.program[4]['programEndDate']   = '';

				
				//option value
				admin_add_ctrl.studentModel.marketingSurvey               = 'noneSelected';
				admin_add_ctrl.studentModel.graduate                      = 'noneSelected';
				admin_add_ctrl.studentModel.notGraduatingReason           = 'noneSelected';
				admin_add_ctrl.studentModel.tuitionPaid                   = 'noneSelected';
				admin_add_ctrl.studentModel.jobPlaced                     = 'noneSelected';
				admin_add_ctrl.studentModel.weeklyWorkHours               = 'noneSelected';
				admin_add_ctrl.studentModel.passedExam                    = 'noneSelected';
				admin_add_ctrl.studentModel.numberOfTries                 = 'noneSelected';
				admin_add_ctrl.studentModel.noPassReason                  = 'noneSelected';
				admin_add_ctrl.studentModel.program[0]['programName']     = 'noneSelected';
				admin_add_ctrl.studentModel.program[1]['programName']     = 'noneSelected';
				admin_add_ctrl.studentModel.program[2]['programName']     = 'noneSelected';
				admin_add_ctrl.studentModel.program[3]['programName']     = 'noneSelected';
				admin_add_ctrl.studentModel.program[4]['programName']     = 'noneSelected';
			};



//google sign in:

			admin_add_ctrl.googleSigninBtnID = 'g-signin2';
			admin_add_ctrl.googleSigninOptions = {
				'onsuccess': function(successResponse) {
					console.log(successResponse);
					admin_add_ctrl.turnOnSyncButton = true;
				}
			};	

			admin_add_ctrl.googlePostData = function() {
				var postData;
				postData = {
					annualReport: {
						lastName         : admin_add_ctrl.studentModel.lastName,
						firstName        : admin_add_ctrl.studentModel.firstName,
						phoneNumber      : admin_add_ctrl.studentModel.phoneNumber,
						email            : admin_add_ctrl.studentModel.email,
						address          : admin_add_ctrl.studentModel.address,
						course           : courseEval(admin_add_ctrl.studentModel.program),
						startDate        : startDateEval(admin_add_ctrl.studentModel.program),
						completionDate   : completionDateEval(admin_add_ctrl.studentModel.program),
						graduate         : admin_add_ctrl.studentModel.graduate,
						passedExam       : admin_add_ctrl.studentModel.passedExam,
						employed         : admin_add_ctrl.studentModel.jobPlaced,
						placeOfEmployment: admin_add_ctrl.studentModel.placeOfEmployment,
						employmentAddress: admin_add_ctrl.studentModel.employmentAddress,
						postion          : admin_add_ctrl.studentModel.jobPosition,
						startingWage     : admin_add_ctrl.studentModel.payRate,
						Hours            : admin_add_ctrl.studentModel.weeklyWorkHours,
						description      : 'job information was given by Kevin Ren via website/google sync'

					},
					STRF: {
						studentID                              : admin_add_ctrl.studentModel.studentID,
						lastName                               : admin_add_ctrl.studentModel.lastName,
						firstName                              : admin_add_ctrl.studentModel.firstName,
						email                                  : admin_add_ctrl.studentModel.email,
						localOrMailingAddress                  : admin_add_ctrl.studentModel.address,
						addressAtTheTimeOfEnrollment           : 'same as mailing address',
						homeAddress                            : 'same as mailing address',
						dateEnrollment                         : new Date(admin_add_ctrl.studentModel.enrollmentDate).toISOString().slice(0,10),
						course                                 : courseEval(admin_add_ctrl.studentModel.program),
						courseCost                             : '$' + admin_add_ctrl.studentModel.tuition,	//string + number = string
						amountOfSTRF                           : '$0.00',
						quarterInWhichSTRFAssessmentWasRemitted: quarterEval(admin_add_ctrl.studentModel.enrollmentDate),
						thirParty                              : '',	//always left blank, need to be maually inputted
						totalInstitutionalCharged              : '$' + admin_add_ctrl.studentModel.tuition,
						totalInstitutionalPaid                 : '$' + admin_add_ctrl.studentModel.tuition	//would this work?
					}
				};	//also could be manipulated in the backend

				function courseEval(programArr) {
					var courseNames = [];
					var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
						return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
					});
					for (var i = 0; i < programs.length; i++){	//iterating through each program
						if (programs[i]['programName'] === 'CNA')
							courseNames.push('Nurse Assistant');
						else if (programs[i]['programName'] === 'HHA')
							courseNames.push('Home Health Aide');
						else if (programs[i]['programName'] === 'SG')
							courseNames.push('Security Guard');
						else if (programs[i]['programName'] === 'ESOL')
							courseNames.push('ESOL')
						//could potentially add more such as caregiver, RNA, etc..
					}
					return courseNames;	//the total number of items in the arr determines how many spreadsheets needs to be inputed aka one for each program
				}

				function startDateEval(programArr) {
					// var startDates = [];
					var startDates = {};
					var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
						return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
					});

					programs.forEach(function(eachProgram) {
						if (eachProgram.programName === 'CNA'){
							startDates.CNA = {};
							startDates.CNA.startDate = eachProgram.programStartDate;
						}else if (eachProgram.programName === 'HHA'){
							startDates.HHA = {};
							startDates.HHA.startDate = eachProgram.programStartDate;
						}else if (eachProgram.programName === 'SG'){
							startDates.SG = {};
							startDates.SG.startDate = eachProgram.programStartDate;
						}else if (eachProgram.programName === 'ESOL') {
							startDates.ESOL = {};
							startDates.ESOL.startDate = eachProgram.programStartDate;
						}else if(eachProgram.programName === 'caregiver'){
							startDates.caregiver = {};
							startDates.caregiver.endDate = eachProgram.programStartDate;
						}
					});

					// startDates = programs.map(function(eachProgram) {
					// 	var newItem = {
					// 		programName: eachProgram.programName,
					// 		startDate: eachProgram.programStartDate
					// 	};
					// 	return newItem;
					// });
					return startDates;
				}

				function completionDateEval(programArr) {
					var endDates = {};
					// var endDates = [];
					var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
						return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
					});

					programs.forEach(function(eachProgram) {
						if (eachProgram.programName === 'CNA'){
							endDates.CNA = {};
							endDates.CNA.endDate = eachProgram.programEndDate;
						}else if (eachProgram.programName === 'HHA'){
							endDates.HHA = {};
							endDates.HHA.endDate = eachProgram.programEndDate;
						}else if (eachProgram.programName === 'SG'){
							endDates.SG = {};
							endDates.SG.endDate = eachProgram.programEndDate;
						}else if (eachProgram.programName === 'ESOL') {
							endDates.ESOL = {};
							endDates.ESOL.endDate = eachProgram.programEndDate;
						}else if(eachProgram.programName === 'caregiver'){
							endDates.caregiver = {};
							endDates.caregiver.endDate = eachProgram.programEndDate;
						}
					});

					// endDates = programs.map(function(eachProgram) {
					// 	var newItem = {
					// 		programName: eachProgram.programName,
					// 		endDate: eachProgram.programEndDate
					// 	};
					// 	return newItem;
					// });
					return endDates;	//WHY DONT WE CHANGE THE FORMAT TO OBJECTS, EASIER DATA MANIPULATION
				}

				function quarterEval(enrollmentDate) {
					var quarter;
					var month = enrollmentDate.slice(5, 7);
					switch (month){
						case '01': 
							quarter = 'first';
							break;
						case '02':
							quarter = 'first';
							break;
						case '03':
							quarter = 'first';
							break;
						case '04':
							quarter = 'second';
							break;
						case '05':
							quarter = 'second';
							break;
						case '06':
							quarter = 'second';
							break;
						case '07':
							quarter = 'third';
							break;
						case '08':
							quarter = 'third';
							break;
						case '09':
							quarter = 'third';
							break;
						case '10':
							quarter = 'fourth';
							break;
						case '11':
							quarter = 'fourth';
							break;
						case '12':
							quarter = 'fourth';
							break; 
					}
					return quarter;
				}

				function filter(data) {	//takes care of graudate, passedexam, employed, and all other boolean/noneselected fields to change it to ''
					for (var eachSheet in data) {
						for (var eachProperty in data[eachSheet]){
							if (data[eachSheet][eachProperty] === 'noneSelected' || data[eachSheet][eachProperty] === false || data[eachSheet][eachProperty] === '')
								data[eachSheet][eachProperty] = 'N/A';
						}
					}
					console.log(data);
					return data;
				}	
				//NEED TO FILTER THROUGH EMPTY ONES AND PUT N/A INSTEAD, FOR GOOGLE SHEETS API TO FUNCTION PROPERLY
				
				postData = filter(postData);

				return postData;
			};

			admin_add_ctrl.enterDummyData = function() {
				admin_add_ctrl.studentModel.firstName                      = 'Kevin';
				admin_add_ctrl.studentModel.lastName                       = lastnameGen();	//could be randomized
				admin_add_ctrl.studentModel.studentID                      = '50-0628-KR';
				admin_add_ctrl.studentModel.enrollmentDate                 = '2017/06/28';
				admin_add_ctrl.studentModel.phoneNumber                    = '1234567890';
				admin_add_ctrl.studentModel.ssn                            = '123456789';
				admin_add_ctrl.studentModel.address                        = '501 S. Marguerita Ave, Alhambra CA 91803';
				admin_add_ctrl.studentModel.email                          = 'kevin@kevin.com';
				admin_add_ctrl.studentModel.tuition                        = 2386;
				admin_add_ctrl.studentModel.tuitionPaid                    = "true";
				admin_add_ctrl.studentModel.graduate                       = "";
				admin_add_ctrl.studentModel.marketingSurvey                = "Chinese_In_LA";
				admin_add_ctrl.studentModel.program[0]['programName']      = "CNA";
				admin_add_ctrl.studentModel.program[0]['programRotation']  = "50";
				admin_add_ctrl.studentModel.program[0]['programStartDate'] = "06/22/2017";
				admin_add_ctrl.studentModel.program[0]['programEndDate']   = "08/19/2017";
				admin_add_ctrl.studentModel.notGraduatingReason            = 'Still_in_program';
				admin_add_ctrl.ngSelectOption.graduateFalse 			   = true;
				admin_add_ctrl.ngSelectOption.stillInProgram			   = true;

				function lastnameGen() {	//from stackoverflow/questions/1349404/generate-random-string-characters-in-javascript
				    var text = "test";
				    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

				    for( var i=0; i < 5; i++ )
				        text += possible.charAt(Math.floor(Math.random() * possible.length));

				    return text;
				}
			};


						
			// admin_add_ctrl.letsSyncWitGoogle = function() {
			// 	var postData = admin_add_ctrl.googlePostData();	//the data needs to be further manipulated for each program to be inputted in each google sheet
			// 	makeRequest('/admin/GoogleSync/', postData, callbackFunc);
			// 	function callbackFunc(err, spreadsheet) {
			// 		if (err) toastFactory.errorToast(err);
			// 		//if no err, it will call back with spreadsheet
			// 		//Do stuff with response in spreadsheet
			// 	}
			// 	function makeRequest(URL, data, callback) {
			// 		var params,
			// 			auth,
			// 			accessToken,
			// 			configObj;
			// 		params = {
			// 			client_id: '1080610187210-b2d58di99vr262qj9g17vm0jgnncb6bp.apps.googleusercontent.com'
			// 		};
			// 		gapi.auth2.init(params);	//initialize google auth
			// 		auth = gapi.auth2.getAuthInstance();	//returns googleUser Obj
			// 		//check if user is signed in
			// 		if (!auth.isSignedIn.get())	return callback('you need to sign in wit google', null);
			// 		accessToken = auth.currentUser.get().getAuthResponse().access_token;	//grabbing access token
			// 		configObj = {
			// 			headers: {
			// 				'Authorization': 'Bearer ' + accessToken 
			// 			}
			// 		}
			// 		console.log('TESTING ACCESS TOKEN: ', accessToken);
			// 		ajaxService.post(URL, postData, configObj)
			// 			.then(function(successResponse) {
			// 				console.log(successResponse);
			// 				return callback(null, successResponse);
			// 			}, 
			// 				function(failureResponse) {
			// 					console.log(failureResponse);
			// 					return callback(failureResponse.data);
			// 			});
			// 	}
			// };		

		}
}());
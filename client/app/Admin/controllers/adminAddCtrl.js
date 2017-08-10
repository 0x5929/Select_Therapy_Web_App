(function() {

//NEED TO ADD ERROR HANDLING FOR THESE ADD FIELDS, CANCEL SUBMIT AND PROMPT ERR TOAST MESSAGE

	'use strict';

	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', '$stateParams', '$filter', 'ajaxService', 'toastFactory', 'studentValue', 'modalFactory', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, $stateParams, $filter, ajaxService, toastFactory, studentValue, modalFactory) {	//may want to delete filter, it does nothin
			
			var admin_add_ctrl               = this;
			var postData                     = null;

			admin_add_ctrl.googleSync        = false;
			admin_add_ctrl.turnOnSyncButton  = false;


			admin_add_ctrl.ngSelectOption = {	//initialize ng select option to be initially false
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
				program 		   : [],
				marketingSurvey    : 'noneSelected'
			};	


// IF ADMIN IS MODIFYING STUDENT INFO: 
//add a modifying function that will populate all data from search to add


			//first check if state params is modifying
			//if so we need to fill in all the ng models with studentvalue service

			if ($stateParams.func && $stateParams.func === 'modify') {
				// var programObj 					 = {	//initalized to be pushed into the program arr
				// 	programName     : 'noneselected',
				// 	programRotation : '',
				// 	programStartDate: '',
				// 	programEndDate  : ''
				// };
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
				// //need to implement a logic to count how many programs obj in program arr
				// //5 - the above number needs to be pushed into the program arr so it can properly reflect the program ng model
				// for (var currentProgramNum = admin_add_ctrl.studentModel.program.length; 
				// 	5 - currentProgramNum > 0; currentProgramNum++){
				// 	admin_add_ctrl.studentModel.program.push(programObj);
				// }
			}


			admin_add_ctrl.ngSelect = function(params) {
				if ($stateParams.func === 'modify'){	//program select options
					switch (params) 
					{
						// case 'firstProgram':{
						// 	if (admin_add_ctrl.studentModel.program[0]){
						// 		if (admin_add_ctrl.studentModel.program[0]['programName'] === 'CNA')
						// 			return admin_add_ctrl.ngSelectOption.programs[0]['CNA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'HHA')
						// 			return admin_add_ctrl.ngSelectOption.programs[0]['HHA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'SG')
						// 			return admin_add_ctrl.ngSelectOption.programs[0]['SG']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'ESOL')
						// 			return admin_add_ctrl.ngSelectOption.programs[0]['ESOL']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[0]['programName'] === 'caregiver')
						// 			return admin_add_ctrl.ngSelectOption.programs[0]['caregiver']  = true;								
						// 	}else return true;
						// }
						// case 'secondProgram':{
						// 	if (admin_add_ctrl.studentModel.program[1]){
						// 		if (admin_add_ctrl.studentModel.program[1]['programName'] === 'CNA')
						// 			return admin_add_ctrl.ngSelectOption.programs[1]['CNA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'HHA')
						// 			return admin_add_ctrl.ngSelectOption.programs[1]['HHA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'SG')
						// 			return admin_add_ctrl.ngSelectOption.programs[1]['SG']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'ESOL')
						// 			return admin_add_ctrl.ngSelectOption.programs[1]['ESOL']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[1]['programName'] === 'caregiver')
						// 			return admin_add_ctrl.ngSelectOption.programs[1]['caregiver']  = true;								
						// 	}else return true;
						// }
						// case 'thirdProgram':{
						// 	if (admin_add_ctrl.studentModel.program[2]){
						// 		if (admin_add_ctrl.studentModel.program[2]['programName'] === 'CNA')
						// 			return admin_add_ctrl.ngSelectOption.programs[2]['CNA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'HHA')
						// 			return admin_add_ctrl.ngSelectOption.programs[2]['HHA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'SG')
						// 			return admin_add_ctrl.ngSelectOption.programs[2]['SG']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'ESOL')
						// 			return admin_add_ctrl.ngSelectOption.programs[2]['ESOL']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[2]['programName'] === 'caregiver')
						// 			return admin_add_ctrl.ngSelectOption.programs[2]['caregiver']  = true;								
						// 	}else return true;
						// }
						// case 'fourthProgram':{
						// 	if (admin_add_ctrl.studentModel.program[3]){
						// 		if (admin_add_ctrl.studentModel.program[3]['programName'] === 'CNA')
						// 			return admin_add_ctrl.ngSelectOption.programs[3]['CNA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'HHA')
						// 			return admin_add_ctrl.ngSelectOption.programs[3]['HHA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'SG')
						// 			return admin_add_ctrl.ngSelectOption.programs[3]['SG']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'ESOL')
						// 			return admin_add_ctrl.ngSelectOption.programs[3]['ESOL']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[3]['programName'] === 'caregiver')
						// 			return admin_add_ctrl.ngSelectOption.programs[3]['caregiver']  = true;								
						// 	}else return true;
						// }
						// case 'fifthProgram':{
						// 	if (admin_add_ctrl.studentModel.program[4]){
						// 		if (admin_add_ctrl.studentModel.program[4]['programName'] === 'CNA')
						// 			return admin_add_ctrl.ngSelectOption.programs[4]['CNA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'HHA')
						// 			return admin_add_ctrl.ngSelectOption.programs[4]['HHA'] = true;
						// 		else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'SG')
						// 			return admin_add_ctrl.ngSelectOption.programs[4]['SG']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'ESOL')
						// 			return admin_add_ctrl.ngSelectOption.programs[4]['ESOL']  = true;
						// 		else if (admin_add_ctrl.studentModel.program[4]['programName'] === 'caregiver')
						// 			return admin_add_ctrl.ngSelectOption.programs[4]['caregiver']  = true;								
						// 	}else return true;
						// }
						// case 'tuitionPaid':{
						// 	if (admin_add_ctrl.studentModel.tuitionPaid === true)
						// 		return admin_add_ctrl.ngSelectOption.tuitionPaidTrue = true;
						// 	else if (admin_add_ctrl.studentModel.tuitionPaid === false)
						// 		return admin_add_ctrl.ngSelectOption.tuitionPaidFalse = true;
						// 	else return true;
						// }
						// case 'graduate': {
						// 	if (admin_add_ctrl.studentModel.graduate === true)
						// 		return admin_add_ctrl.ngSelectOption.graduateTrue = true;
						// 	else if (admin_add_ctrl.studentModel.graduate === false)
						// 		return admin_add_ctrl.ngSelectOption.graduateFalse = true;	
						// 	else return true;						
						// }
						// case 'notGraduatingReason': {
						// 	if (admin_add_ctrl.studentModel.notGraduatingReason === 'Still_in_program')
						// 		return admin_add_ctrl.ngSelectOption.stillInProgram = true;
						// 	else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Dropped_the_program')
						// 		return admin_add_ctrl.ngSelectOption.droppedTheProgram = true;
						// 	else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Missing_clinical_hours')
						// 		return admin_add_ctrl.ngSelectOption.missingClinical = true;
						// 	else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Missing_theory_hours')
						// 		return admin_add_ctrl.ngSelectOption.missingTheroy = true;
						// 	else if (admin_add_ctrl.studentModel.notGraduatingReason === 'Did_not_finish_payment')
						// 		return admin_add_ctrl.ngSelectOption.didnNotFinishPayment = true;	
						// 	else return true;						
						// }
						// case 'passedExam': {
						// 	if (admin_add_ctrl.studentModel.passedExam === true)
						// 		return admin_add_ctrl.ngSelectOption.passedExam = true;
						// 	else if (admin_add_ctrl.studentModel.passedExam === false) 
						// 		return admin_add_ctrl.ngSelectOption.didNotpassExam = true;		
						// 	else return true;					
						// }
						// case 'numberOfTries': {
						// 	if (admin_add_ctrl.studentModel.numberOfTries === 1)
						// 		return admin_add_ctrl.ngSelectOption.firstTry = true;
						// 	else if (admin_add_ctrl.studentModel.numberOfTries === 2)
						// 		return admin_add_ctrl.ngSelectOption.secondTry = true;
						// 	else if (admin_add_ctrl.studentModel.numberOfTries === 3)
						// 		return admin_add_ctrl.ngSelectOption.thirdTry = true;		
						// 	else return true;					
						// }
						// case 'noPassReason': {
						// 	if (admin_add_ctrl.studentModel.noPassReason === 'Have_not_taken_the_exam')
						// 		return admin_add_ctrl.ngSelectOption.haveNotTakenExam = true;
						// 	else if (admin_add_ctrl.studentModel.noPassReason === 'Failed_theory')	
						// 		return admin_add_ctrl.ngSelectOption.failedTheory = true;
						// 	else if (admin_add_ctrl.studentModel.noPassReason === 'Failed_skills')	
						// 		return admin_add_ctrl.ngSelectOption.failedSkills = true;	
						// 	else return true;			
						// }
						// case 'jobPlaced': {
						// 	if (admin_add_ctrl.studentModel.jobPlaced === true)
						// 		return admin_add_ctrl.ngSelectOption.employed = true;
						// 	else if (admin_add_ctrl.studentModel.jobPlaced === false)
						// 		return admin_add_ctrl.ngSelectOption.unemployed = true;
						// 	else return true;							
						// }
						// case 'weeklyWorkHours': {
						// 	if (admin_add_ctrl.studentModel.weeklyWorkHours === 'fullTimePos')
						// 		return admin_add_ctrl.ngSelectOption.fullTime = true;
						// 	else if (admin_add_ctrl.studentModel.weeklyWorkHours === 'partTimePos')
						// 		return admin_add_ctrl.ngSelectOption.partTime = true;
						// 	else return true;
						// }
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







			admin_add_ctrl.noErrorCheck = function(dataTobeChecked) {

				if (!(dataTobeChecked.firstName) || (!isNaN(dataTobeChecked.firstName)) && !(/^\S*$/.test(dataTobeChecked.firstName))){	//regex that there is no space
					toastFactory.errorToast("please check the student's first name input");
					return false;
				}
				if (!(dataTobeChecked.lastName) || (!isNaN(dataTobeChecked.lastName)) && (/^\S*$/.test(dataTobeChecked.lastName))){
					toastFactory.errorToast("please check the student's last name input");
					return false;
				}
				if (!(dataTobeChecked.address) || !isNaN(dataTobeChecked.address)){
					toastFactory.errorToast("please check the student's address input");
					return false;
				}
				if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(dataTobeChecked.email))) {
					toastFactory.errorToast("please enter a valid email");
					return false;
				}
				// for (var i = 0; i < dataTobeChecked.program.length; i++){
				// 	if (!(dataTobeChecked.program[i]['programName'])){
				// 		toastFactory.errorToast("make sure you choose a valid program name");
				// 		return false;
				// 	}
				// 	if (isNaN(dataTobeChecked.program[i]['programRotation'])){
				// 		toastFactory.errorToast("make sure you enter a valid program rotation number");
				// 		return false;
				// 	}
				// 	if (!dataTobeChecked.program[i]['programStartDate']){
				// 		toastFactory.errorToast('make sure you enter a start date for the program');
				// 		return false;
				// 	}
				// 	if (!dataTobeChecked.program[i]['programEndDate']) {
				// 		toastFactory.errorToast('make sure you enter an end date for the program');
				// 		return false;
				// 	}
				// }
				// for (var j = 0; j < dataTobeChecked.program.length; j++){
				// 	for (var k = 0; k < dataTobeChecked.program.length; k++){
				// 		if (j !== k && dataTobeChecked.program[j]['programName'] === dataTobeChecked.program[k]['programName']){
				// 			toastFactory.errorToast("please make sure you don't add two of the same programs");
				// 			return false;
				// 		}
				// 	}
				// }
				// if (dataTobeChecked.graduate === 'noneSelected'){
				// 	toastFactory.errorToast("please check the graduate field");
				// 	return false;
				// }
				// if (dataTobeChecked.tuitionPaid === 'noneSelected'){
				// 	toastFactory.errorToast("please check the tuition field");
				// 	return false;
				// }
				// if (dataTobeChecked.graduate === 'true' && dataTobeChecked.jobPlaced === 'noneSelected'){
				// 	toastFactory.errorToast("please check the job placed field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === 'true' && dataTobeChecked.weeklyWorkHours === 'noneSelected'){
				// 	toastFactory.errorToast("please check the weekly hours field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === 'true' && isNaN(dataTobeChecked.payRate)){
				// 	toastFactory.errorToast("please enter a valid pay rate");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.placeOfEmployment)){
				// 	toastFactory.errorToast("please check the place of employment field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.employmentAddress)){
				// 	toastFactory.errorToast("please check the employment address field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.jobPosition)){
				// 	toastFactory.errorToast("please check the job jobPosition field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced === '' && !(dataTobeChecked.noJobReason)){
				// 	toastFactory.errorToast("please check the unemployed reason field");
				// 	return false;
				// }
				// if (dataTobeChecked.graduate === 'true' && dataTobeChecked.passedExam === 'noneSelected'){
				// 	toastFactory.errorToast("please check the passed exam field");
				// 	return false;
				// }
				// if (dataTobeChecked.graduate === '' && dataTobeChecked.notGraduatingReason === 'noneSelected'){
				// 	toastFactory.errorToast("please check the no gradute field");
				// 	return false;
				// }
				// if (dataTobeChecked.passedExam === 'true' && isNaN(dataTobeChecked.numberOfTries)){
				// 	toastFactory.errorToast("please check the exam num of tries field");
				// 	return false;
				// }
				// if (dataTobeChecked.passedExam === '' && dataTobeChecked.noPassReason === 'noneSelected'){
				// 	toastFactory.errorToast("please check the no pass reason field");
				// 	return false;
				// }
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
					enrollmentDate     : new Date(admin_add_ctrl.studentModel.enrollmentDate).toISOString().slice(0,10),	//need to add for the rest
					studentID          : admin_add_ctrl.studentModel.studentID,
					firstName          : admin_add_ctrl.studentModel.firstName,
					lastName           : admin_add_ctrl.studentModel.lastName,
					// name            : admin_add_ctrl.firstName + ' ' + admin_add_ctrl.lastName,
					phoneNumber        : admin_add_ctrl.studentModel.phoneNumber,
					ssn                : admin_add_ctrl.studentModel.ssn,
					address            : admin_add_ctrl.studentModel.address,
					email              : admin_add_ctrl.studentModel.email,
					program            : admin_add_ctrl.studentModel.program,
					marketingSurvey    : admin_add_ctrl.studentModel.marketingSurvey,
					originalName       : admin_add_ctrl.studentModel.originalName,
					googlePostData     : admin_add_ctrl.googlePostData()
			};

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


			admin_add_ctrl.showModel = function() {
				console.log('HELLO WORLD FROM SHOW MODEL FUNCTION');
				console.log('STUDENT MODEL', admin_add_ctrl.studentModel);

			};

/*******************************************
			ADD PROGRAM FUNCTIONALITY
			MODAL SETUP AND FUNCTIONS 
********************************************/	
			
			//Program constructor

			var Program = function(addProgramObj) {
				this.programName         = addProgramObj.programName;
				this.programRotation     = addProgramObj.programRotation;
				this.programTuition      = addProgramObj.programTuition;
				this.programStartDate    = addProgramObj.programStartDate;
				this.programEndDate      = addProgramObj.programEndDate;
				this.paymentStatus       = addProgramObj.tuitionPaid;
				this.graduateStatus      = addProgramObj.graduate;
				this.notGraduatingReason = addProgramObj.notGraduatingReason;
				this.passedExam          = addProgramObj.passedExam;
				this.numberOfTries       = addProgramObj.numberOfTries;
				this.noPassReason        = addProgramObj.noPassReason;
				this.employmentStatus    = addProgramObj.jobPlaced;
				this.payRate             = addProgramObj.payRate;
				this.placeOfEmployment   = addProgramObj.placeOfEmployment;
				this.employmentAddress   = addProgramObj.employerAddress;
				this.jobPosition         = addProgramObj.jobPosition;
				this.weeklyWorkHours     = addProgramObj.weeklyWorkHours;
				this.unemploymentReason  = addProgramObj.unemploymentReason;

			};

			//	initialize addProgram obj
			admin_add_ctrl.addProgram = {};
			admin_add_ctrl.addProgram.refresh = function() {
				console.log('LINE 473');
				//ng models

				admin_add_ctrl.addProgram.showErrorMessage   = false;
				admin_add_ctrl.addProgram.errMessages        = [];
				//inputFields                                :
				admin_add_ctrl.addProgram.programRotation    = '';
				admin_add_ctrl.addProgram.programStartDate   = '';
				admin_add_ctrl.addProgram.programEndDate     = '';
				admin_add_ctrl.addProgram.programTuition     = '';
				admin_add_ctrl.addProgram.payRate            = '';
				admin_add_ctrl.addProgram.placeOfEmployment  = '';
				admin_add_ctrl.addProgram.employerAddress    = '';
				admin_add_ctrl.addProgram.jobPosition        = '';
				admin_add_ctrl.addProgram.unemploymentReason = '';
				//options: 
				admin_add_ctrl.addProgram.programName         = 'noneSelected';
				admin_add_ctrl.addProgram.tuitionPaid         = 'noneSelected';
				admin_add_ctrl.addProgram.graduate            = 'noneSelected';
				admin_add_ctrl.addProgram.notGraduatingReason = 'noneSelected';
				admin_add_ctrl.addProgram.passedExam          = 'noneSelected';
				admin_add_ctrl.addProgram.numberOfTries       = 'noneSelected';
				admin_add_ctrl.addProgram.noPassReason        = 'noneSelected';
				admin_add_ctrl.addProgram.jobPlaced           = 'noneSelected';
				admin_add_ctrl.addProgram.weeklyWorkHours     = 'noneSelected';

			};
			admin_add_ctrl.addingProgram = function() {
				//initiate modal
				modalFactory.addProgramModalService($scope);

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

			admin_add_ctrl.bind = function(addProgramObj) {
				console.log(admin_add_ctrl.studentModel);
				admin_add_ctrl.studentModel.program.push(new Program(addProgramObj));
				console.log(admin_add_ctrl.studentModel);
				addProgramObj.refresh();
			};

			admin_add_ctrl.okModal = function() {

				//scope.close
				//and pass in ngmodels
				//should do a check before adding a new program into the array
				admin_add_ctrl.addProgram.errMessages = [];
				console.log('LINE 525');
				if (programErrorCheck(admin_add_ctrl.addProgram)){
					admin_add_ctrl.bind(admin_add_ctrl.addProgram);
					// admin_add_ctrl.studentModel.program.push(new Program(admin_add_ctrl.addProgram));
					// console.log('LINE 528', admin_add_ctrl.studentModel.program);
					//refresh
					// admin_add_ctrl.addProgram.refresh();
					$scope.$close();
					// console.log('HELLO WORLD, THIS SHOULD HAVE THE PROGRAM OBJ', admin_add_ctrl.studentModel.program);
					// console.log('HELLO WORLD, THIS SHOULD HAVE THE WHOLE STUDENT MODEL', admin_add_ctrl.studentModel);
				}else admin_add_ctrl.addProgram.showErrorMessage = true;

				function programErrorCheck(data) {
					console.log('LINE 534', admin_add_ctrl.studentModel.program);

					if (!(data['programName']))
						data.errMessages.push("make sure you choose a valid program name");
					if (!(data['programRotation']) || (isNaN(data['programRotation'])))
						data.errMessages.push("make sure you enter a valid program rotation number");
					if (!data['programStartDate'])
						data.errMessages.push('make sure you enter a start date for the program');
					if (!data['programEndDate']) 
						data.errMessages.push('make sure you enter an end date for the program');
					if (admin_add_ctrl.studentModel.program.length > 0){
						for (var i = 0; i < admin_add_ctrl.studentModel.program.length; i++){
							if (admin_add_ctrl.studentModel.program[i]['programName'] === data['programName']){
								data.errMessages.push('please make sure you do not add two of the same program');
							}
						}
					}
					if (data.graduate === 'noneSelected')
						data.errMessages.push("please check the graduate field");
					if (data.tuitionPaid === 'noneSelected')
						data.errMessages.push("please check the tuition field");
					if (data.jobPlaced === 'noneSelected')
						data.errMessages.push("please check the job placed field");
					if (data.weeklyWorkHours === 'noneSelected')
						data.errMessages.push("please check the weekly hours field");
					if (!(data.payRate))
						data.errMessages.push("please enter a valid pay rate");
					if (!(data.placeOfEmployment))
						data.errMessages.push("please check the place of employment field");
					if (!(data.employerAddress))
						data.errMessages.push("please check the employer address field, and enter N/A for unemployed graduates");
					if (!(data.jobPosition))
						data.errMessages.push("please check the job Position field, and enter N/A for unemployed graduates");
					if (!(data.unemploymentReason))
						data.errMessages.push("please check the unemployed reason field, and enter N/A for employed graduates");
					if (data.passedExam === 'noneSelected')
						data.errMessages.push("please check the passed exam field");
					if (data.notGraduatingReason === 'noneSelected')
						data.errMessages.push("please check the no gradute field");
					if (!(data.numberOfTries))
						data.errMessages.push("please check the exam number of tries field");
					if (data.noPassReason === 'noneSelected')
						data.errMessages.push("please check the no pass reason field");
					if (data.errMessages.length > 0){
						admin_add_ctrl.addProgram.showErrorMessage = true;
						return false;
					}
					return true;
				}
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
				// admin_add_ctrl.studentModel.tuition                        = '';
				// admin_add_ctrl.studentModel.payRate                        = '';
				// admin_add_ctrl.studentModel.placeOfEmployment              = '';
				// admin_add_ctrl.studentModel.employmentAddress              = '';
				// admin_add_ctrl.studentModel.jobPosition                    = '';
				// admin_add_ctrl.studentModel.noJobReason                    = '';
				// admin_add_ctrl.studentModel.program[0]['programRotation']  = '';
				// admin_add_ctrl.studentModel.program[1]['programRotation']  = '';
				// admin_add_ctrl.studentModel.program[2]['programRotation']  = '';
				// admin_add_ctrl.studentModel.program[3]['programRotation']  = '';
				// admin_add_ctrl.studentModel.program[4]['programRotation']  = '';
				// admin_add_ctrl.studentModel.program[0]['programStartDate'] = '';
				// admin_add_ctrl.studentModel.program[1]['programStartDate'] = '';
				// admin_add_ctrl.studentModel.program[2]['programStartDate'] = '';
				// admin_add_ctrl.studentModel.program[3]['programStartDate'] = '';
				// admin_add_ctrl.studentModel.program[4]['programStartDate'] = '';
				// admin_add_ctrl.studentModel.program[0]['programEndDate']   = '';
				// admin_add_ctrl.studentModel.program[1]['programEndDate']   = '';
				// admin_add_ctrl.studentModel.program[2]['programEndDate']   = '';
				// admin_add_ctrl.studentModel.program[3]['programEndDate']   = '';
				// admin_add_ctrl.studentModel.program[4]['programEndDate']   = '';

				
				//option value
				admin_add_ctrl.studentModel.marketingSurvey               = 'noneSelected';
				// admin_add_ctrl.studentModel.graduate                      = 'noneSelected';
				// admin_add_ctrl.studentModel.notGraduatingReason           = 'noneSelected';
				// admin_add_ctrl.studentModel.tuitionPaid                   = 'noneSelected';
				// admin_add_ctrl.studentModel.jobPlaced                     = 'noneSelected';
				// admin_add_ctrl.studentModel.weeklyWorkHours               = 'noneSelected';
				// admin_add_ctrl.studentModel.passedExam                    = 'noneSelected';
				// admin_add_ctrl.studentModel.numberOfTries                 = 'noneSelected';
				// admin_add_ctrl.studentModel.noPassReason                  = 'noneSelected';
				// admin_add_ctrl.studentModel.program[0]['programName']     = 'noneSelected';
				// admin_add_ctrl.studentModel.program[1]['programName']     = 'noneSelected';
				// admin_add_ctrl.studentModel.program[2]['programName']     = 'noneSelected';
				// admin_add_ctrl.studentModel.program[3]['programName']     = 'noneSelected';
				// admin_add_ctrl.studentModel.program[4]['programName']     = 'noneSelected';
			};



//google sign in:

			admin_add_ctrl.googleSigninBtnID = 'g-signin2';
			admin_add_ctrl.googleSigninOptions = {
				'onsuccess': function(successResponse) {
					console.log(successResponse);
					admin_add_ctrl.turnOnSyncButton = true;
				}
			};	

			//new format: 
			/* postData = {
				annualReport: [{}],
				STRF: [{}]
			}
*/
			admin_add_ctrl.googlePostData = function() {
				var postData;
				postData = {
					// annualReport: {
					// 	lastName         : admin_add_ctrl.studentModel.lastName,
					// 	firstName        : admin_add_ctrl.studentModel.firstName,
					// 	phoneNumber      : admin_add_ctrl.studentModel.phoneNumber,
					// 	email            : admin_add_ctrl.studentModel.email,
					// 	address          : admin_add_ctrl.studentModel.address,
					// 	course           : courseEval(admin_add_ctrl.studentModel.program),
					// 	startDate        : startDateEval(admin_add_ctrl.studentModel.program),
					// 	completionDate   : completionDateEval(admin_add_ctrl.studentModel.program),
					// 	graduate         : admin_add_ctrl.studentModel.graduate,
					// 	passedExam       : admin_add_ctrl.studentModel.passedExam,
					// 	employed         : admin_add_ctrl.studentModel.jobPlaced,
					// 	placeOfEmployment: admin_add_ctrl.studentModel.placeOfEmployment,
					// 	employmentAddress: admin_add_ctrl.studentModel.employmentAddress,
					// 	postion          : admin_add_ctrl.studentModel.jobPosition,
					// 	startingWage     : admin_add_ctrl.studentModel.payRate,
					// 	Hours            : admin_add_ctrl.studentModel.weeklyWorkHours,
					// 	description      : 'job information was given by Kevin Ren via website/google sync'

					// },
					// STRF: {
					// 	studentID                              : admin_add_ctrl.studentModel.studentID,
					// 	lastName                               : admin_add_ctrl.studentModel.lastName,
					// 	firstName                              : admin_add_ctrl.studentModel.firstName,
					// 	email                                  : admin_add_ctrl.studentModel.email,
					// 	localOrMailingAddress                  : admin_add_ctrl.studentModel.address,
					// 	addressAtTheTimeOfEnrollment           : 'same as mailing address',
					// 	homeAddress                            : 'same as mailing address',
					// 	dateEnrollment                         : new Date(admin_add_ctrl.studentModel.enrollmentDate).toISOString().slice(0,10),
					// 	course                                 : courseEval(admin_add_ctrl.studentModel.program),
					// 	courseCost                             : '$' + admin_add_ctrl.studentModel.tuition,	//string + number = string
					// 	amountOfSTRF                           : '$0.00',
					// 	quarterInWhichSTRFAssessmentWasRemitted: quarterEval(admin_add_ctrl.studentModel.enrollmentDate),
					// 	thirdParty                             : '',	//always left blank, need to be maually inputted
					// 	totalInstitutionalCharged              : '$' + admin_add_ctrl.studentModel.tuition,
					// 	totalInstitutionalPaid                 : '$' + admin_add_ctrl.studentModel.tuition	//would this work?
					// }
					annualReport: genPerformanceReport(admin_add_ctrl.studentModel),
					STRF: genSTRF(admin_add_ctrl.studentModel)
				};	//also could be manipulated in the backend

				function genPerformanceReport(data) {
					//init returned array
					var returnedArrOfPerformanceRpts = [];
					//create objs in the init array depending on the program count
					for (var i = 0; i < data.program.length; i++){
						//init the newProgramObj
						var newProgramObj = {};
						//assign newProgramObj's program attributes
						newProgramObj.lastName          = data.lastName;
						newProgramObj.firstName         = data.firstName;
						newProgramObj.phoneNumber       = data.phoneNumber;
						newProgramObj.email             = data.email;
						newProgramObj.address           = data.address;
						newProgramObj.course            = courseNameEval(data.program[i]['programName']);	//course name
						newProgramObj.startDate         = data.program[i]['programStartDate'];
						newProgramObj.completionDate    = data.program[i]['programEndDate'];
						newProgramObj.graduate          = data.program[i]['graduate'];
						newProgramObj.passedExam        = data.program[i]['passedExam'];
						newProgramObj.employed          = data.program[i]['jobPlaced'];
						newProgramObj.placeOfEmployment = data.program[i]['placeOfEmployment'];
						newProgramObj.employmentAddress = data.program[i]['employmentAddress'];
						newProgramObj.postion           = data.program[i]['jobPosition'];
						newProgramObj.startingWage      = data.program[i]['payRate'];
						newProgramObj.Hours             = data.program[i]['weeklyWorkHours'];
						newProgramObj.description       = 'job information was given by Kevin Ren via website/google sync';

						//push the new program obj into return arr to be returned
						returnedArrOfPerformanceRpts.push(newProgramObj);

					}
					return returnedArrOfPerformanceRpts;
				}

				function genSTRF(data) {
					var returnedArrOfSTRF = [];
					for (var i = 0; i < data.program.length; i++){
						var newProgramObj = {};
						newProgramObj.studentID                               = data.studentID;
						newProgramObj.lastName                                = data.lastName;
						newProgramObj.firstName                               = data.firstName;
						newProgramObj.email                                   = data.email;
						newProgramObj.localOrMailingAddress                   = data.address;
						newProgramObj.addressAtTheTimeOfEnrollment            = 'same as mailing address';
						newProgramObj.homeAddress                             = 'same as mailing addresse';
						newProgramObj.enrollmentDate                          = new Date(data.enrollmentDate).toISOString().slice(0,10);
						newProgramObj.course                                  = courseNameEval(data.program[i]['programName']);
						newProgramObj.courseCost                              = '$' +  data.program[i]['programTuition'];
						newProgramObj.amountOfSTRF                            = '$0.00';
						newProgramObj.quarterInWhichSTRFAssessmentWasRemitted = quarterEval(data.enrollmentDate);
						newProgramObj.thirdParty                              = 'PLEASE DELETE IF NOT FUNDED BY THIRDPARTY';
						newProgramObj.totalInstitutionalCharged               = '$' + data.program[i]['programTuition'];
						newProgramObj.totalInstitutionalPaid                  = '$' + data.program[i]['programTuition'];

						returnedArrOfSTRF.push(newProgramObj);

					}
					return returnedArrOfSTRF;
				}

				function courseNameEval(programName) {
					switch (programName){
						case 'CNA':
							return 'Nuse Assistant';
						case 'HHA':
							return 'Home Health Aide';
						case 'SG':
							return 'Security Guard';
						case 'ESOL':
							return 'ESOL';
						case 'RNA':
							return 'Restorative Nurse Assistant';
						case 'Caregiver':
							return 'Caregiver';
					}
				}

				// function courseEval(programArr) {
				// 	var courseNames = [];
				// 	var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
				// 		return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
				// 	});
				// 	for (var i = 0; i < programs.length; i++){	//iterating through each program
				// 		if (programs[i]['programName'] === 'CNA')
				// 			courseNames.push('Nurse Assistant');
				// 		else if (programs[i]['programName'] === 'HHA')
				// 			courseNames.push('Home Health Aide');
				// 		else if (programs[i]['programName'] === 'SG')
				// 			courseNames.push('Security Guard');
				// 		else if (programs[i]['programName'] === 'ESOL')
				// 			courseNames.push('ESOL')
				// 		//could potentially add more such as caregiver, RNA, etc..
				// 	}
				// 	return courseNames;	//the total number of items in the arr determines how many spreadsheets needs to be inputed aka one for each program
				// }

				// function startDateEval(programArr) {
				// 	// var startDates = [];
				// 	var startDates = {};
				// 	var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
				// 		return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
				// 	});

				// 	programs.forEach(function(eachProgram) {
				// 		if (eachProgram.programName === 'CNA'){
				// 			startDates.CNA = {};
				// 			startDates.CNA.startDate = eachProgram.programStartDate;
				// 		}else if (eachProgram.programName === 'HHA'){
				// 			startDates.HHA = {};
				// 			startDates.HHA.startDate = eachProgram.programStartDate;
				// 		}else if (eachProgram.programName === 'SG'){
				// 			startDates.SG = {};
				// 			startDates.SG.startDate = eachProgram.programStartDate;
				// 		}else if (eachProgram.programName === 'ESOL') {
				// 			startDates.ESOL = {};
				// 			startDates.ESOL.startDate = eachProgram.programStartDate;
				// 		}else if(eachProgram.programName === 'caregiver'){
				// 			startDates.caregiver = {};
				// 			startDates.caregiver.endDate = eachProgram.programStartDate;
				// 		}
				// 	});

				// 	return startDates;
				// }

				// function completionDateEval(programArr) {
				// 	var endDates = {};
				// 	// var endDates = [];
				// 	var programs = programArr.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
				// 		return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
				// 	});

				// 	programs.forEach(function(eachProgram) {
				// 		if (eachProgram.programName === 'CNA'){
				// 			endDates.CNA = {};
				// 			endDates.CNA.endDate = eachProgram.programEndDate;
				// 		}else if (eachProgram.programName === 'HHA'){
				// 			endDates.HHA = {};
				// 			endDates.HHA.endDate = eachProgram.programEndDate;
				// 		}else if (eachProgram.programName === 'SG'){
				// 			endDates.SG = {};
				// 			endDates.SG.endDate = eachProgram.programEndDate;
				// 		}else if (eachProgram.programName === 'ESOL') {
				// 			endDates.ESOL = {};
				// 			endDates.ESOL.endDate = eachProgram.programEndDate;
				// 		}else if(eachProgram.programName === 'caregiver'){
				// 			endDates.caregiver = {};
				// 			endDates.caregiver.endDate = eachProgram.programEndDate;
				// 		}
				// 	});

				// 	// endDates = programs.map(function(eachProgram) {
				// 	// 	var newItem = {
				// 	// 		programName: eachProgram.programName,
				// 	// 		endDate: eachProgram.programEndDate
				// 	// 	};
				// 	// 	return newItem;
				// 	// });
				// 	return endDates;	//WHY DONT WE CHANGE THE FORMAT TO OBJECTS, EASIER DATA MANIPULATION
				// }

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

		}
}());
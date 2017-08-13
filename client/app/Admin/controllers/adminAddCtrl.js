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
				for (var studentModelKey in admin_add_ctrl.studentModel){
					for (var studentValueKey in studentValue){
						if (studentModelKey === studentValueKey)
							admin_add_ctrl.studentModel[studentModelKey] = studentValue[studentValueKey];
					}
				}
				//add in an original name key for modifying purposes
				admin_add_ctrl.studentModel.originalName = studentValue.firstName + ' ' + studentValue.lastName;
			}


			admin_add_ctrl.ngSelect = function(params) {
				if ($stateParams.func === 'modify'){	//program select options
					switch (params) 
					{
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



/***********************************************************

VIEW BUTTONS AND NECESSARY FUNCTIONS TO FILTER DATA

************************************************************/




			admin_add_ctrl.submit = function() {
				//NEED TO ALSO MAKE SURE GOOGLE IS PROPERLY AUTHORIZED TO DO ACTIONS
				var postData;
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
				if (noErrorCheck(postData)){	//calling error check to ensure proper data going into server
					dataFilter(postData);
					console.log('testing before data is sent to server: ', postData);
					makeRequest('/admin/add/', postData, callback);
				} 

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

				function noErrorCheck(dataTobeChecked) {
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
					if (dataTobeChecked.marketingSurvey === 'noneSelected'){
						toastFactory.errorToast('Please double check the marketing survey field');
						return false;
					}
					return true;
				}

				function dataFilter(dataToBeFiltered) {
					//to filter through the noneSelected, and change it to empty string to be evaluated as false;
					for (var key in dataToBeFiltered) {
						if ((typeof dataToBeFiltered[key] === 'string' && dataToBeFiltered[key] === 'noneSelected') ||
							typeof dataToBeFiltered[key] === 'undefined')
							dataToBeFiltered[key] = '';
					}
					console.log('testing after data is filtered: ', dataToBeFiltered);
				}
				
			};

			admin_add_ctrl.cancelBtn = function() {
				if ($stateParams.func && $stateParams.func === 'modify'){
					admin_add_ctrl.refresh();
					$state.go('Admin.Admin_Search');
				}else admin_add_ctrl.refresh();
			};


/**************************************************************************************

REFRESH SERVICE
NOTE: got brought out of the cancel btn because submit button needs to access it as well

***************************************************************************************/

			admin_add_ctrl.refresh = function() {
				
				//strings and Numbers				
				admin_add_ctrl.studentModel.enrollmentDate                 = '';
				admin_add_ctrl.studentModel.studentID                      = '';
				admin_add_ctrl.studentModel.firstName                      = '';
				admin_add_ctrl.studentModel.lastName                       = '';
				admin_add_ctrl.studentModel.phoneNumber                    = '';
				admin_add_ctrl.studentModel.ssn                            = '';
				admin_add_ctrl.studentModel.address                        = '';
				admin_add_ctrl.studentModel.email                          = '';
		
				//option value
				admin_add_ctrl.studentModel.marketingSurvey                = 'noneSelected';		

				//re-initialize program arr
				admin_add_ctrl.studentModel.program 					   = [];
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

			admin_add_ctrl.addingProgram = function() {
				//initiate modal
				modalFactory.addProgramModalService(admin_add_ctrl.studentModel.program)
					.then(function(successResponse) {
						var addProgramObj = successResponse;
						if (addProgramObj){	//this check is necesesary because angular ui modal result promise does not pass back rejections
							admin_add_ctrl.studentModel.program.push(new Program(addProgramObj));
							console.log('TESTING, THIS IS THE STUDENT MODEL AFTER PROGRAM IS ADDED, ', admin_add_ctrl.studentModel);
						}else console.log('MODAL WAS DISMISSED, AND PROGRAM WAS NOT ADDED');

					}, function(failureResponse) {	//this will never get called
						console.log('uh oh, there is an error', failureResponse);
					});

			};



/*********************************************

	GOOGLE SIGN IN AND DATA GEN

***********************************************/

//google sign in:

			admin_add_ctrl.googleSigninBtnID = 'g-signin2';
			admin_add_ctrl.googleSigninOptions = {
				'onsuccess': function(successResponse) {
					console.log(successResponse);
					admin_add_ctrl.turnOnSyncButton = true;
				}
			};	

			//POST DATA format: 

			/* postData = {
				annualReport: [{}],
				STRF: [{}]
			}
			*/
			admin_add_ctrl.googlePostData = function() {
				var postData;
				postData = {
					annualReport: genPerformanceReport(admin_add_ctrl.studentModel),
					STRF: genSTRF(admin_add_ctrl.studentModel)
				};

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
							return 'Nurse Assistant';
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


				function filter(data) {	//@param data comes in {perofrmace: [{CNA}, {HHA}], strf: [{CNA}, {HHA}]}
					for (var eachSheet in data){	//each sheet = []
						for (var i = 0; i < data[eachSheet].length; i++){	//each index = {}
							for (var eachProperty in data[eachSheet][i]){	// each property each index {}
								if (data[eachSheet][i][eachProperty] === 'noneSelected' || data[eachSheet][i][eachProperty] === false || data[eachSheet][i][eachProperty] === '')
									data[eachSheet][i][eachProperty] = 'N/A';
							}
						}
					}
					return data;
				}
				//NEED TO FILTER THROUGH EMPTY ONES AND PUT N/A INSTEAD, FOR GOOGLE SHEETS API TO FUNCTION PROPERLY
				
				postData = filter(postData);

				return postData;
			};



/******************************

DUMMY DATA FOR TESTING: 

********************************/

			admin_add_ctrl.enterDummyData = function() {
				admin_add_ctrl.studentModel.firstName                      = 'Kevin';
				admin_add_ctrl.studentModel.lastName                       = lastnameGen();	//could be randomized
				admin_add_ctrl.studentModel.studentID                      = '50-0628-KR';
				admin_add_ctrl.studentModel.enrollmentDate                 = '2017/06/28';
				admin_add_ctrl.studentModel.phoneNumber                    = '1234567890';
				admin_add_ctrl.studentModel.ssn                            = '123456789';
				admin_add_ctrl.studentModel.address                        = '501 S. Marguerita Ave, Alhambra CA 91803';
				admin_add_ctrl.studentModel.email                          = 'kevin@kevin.com';
				admin_add_ctrl.studentModel.marketingSurvey                = "Chinese_In_LA";

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
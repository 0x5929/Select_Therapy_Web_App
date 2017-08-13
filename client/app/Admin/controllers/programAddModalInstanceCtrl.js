(function() {

	'use strict';

	angular.module('myApp.admin')
		.controller('programAddModalInstanceController', programAddModalInstanceCtrlHandler);

		function programAddModalInstanceCtrlHandler($scope, program) {

			var programAddModalInstanceCtrl = this;
			programAddModalInstanceCtrl.addProgram = {};	//initialize add program obj


/**************************************

MODAL VIEW BUTTONS AND FUNCTIONALITIES

***************************************/

			programAddModalInstanceCtrl.okModal = function() {
				//everytime clicking ok in view, the err message arr is refreshed to be empty
				//to be filled in with new err messages in the program error check, if any
				programAddModalInstanceCtrl.addProgram.errMessages = [];	//initialize err message array

				if (programErrorCheck(programAddModalInstanceCtrl.addProgram)){
					$scope.$close(programAddModalInstanceCtrl.addProgram);
				}else programAddModalInstanceCtrl.addProgram.showErrorMessage = true;

				function programErrorCheck(data) {

					if (!(data['programName']))
						data.errMessages.push("make sure you choose a valid program name");
					if (!(data['programRotation']) || (isNaN(data['programRotation'])))
						data.errMessages.push("make sure you enter a valid program rotation number");
					if (!data['programStartDate'])
						data.errMessages.push('make sure you enter a start date for the program');
					if (!data['programEndDate']) 
						data.errMessages.push('make sure you enter an end date for the program');
					if (program.length > 0){
						for (var i = 0; i < program.length; i++){
							if (program[i]['programName'] === data['programName']){
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
						programAddModalInstanceCtrl.addProgram.showErrorMessage = true;
						return false;
					}
					return true;
				}
			};

			programAddModalInstanceCtrl.cancelModal = function() {
				refresh();
				$scope.$dismiss();

				function refresh() {
					//we dont need to show err message when refresh, will be turned on again
					//when clicking ok on modal and checking for errs, if any
					//err message arr will be re-initailized then as well
					programAddModalInstanceCtrl.addProgram.showErrorMessage   = false;
					//inputFields                                :
					programAddModalInstanceCtrl.addProgram.programRotation    = '';
					programAddModalInstanceCtrl.addProgram.programStartDate   = '';
					programAddModalInstanceCtrl.addProgram.programEndDate     = '';
					programAddModalInstanceCtrl.addProgram.programTuition     = '';
					programAddModalInstanceCtrl.addProgram.payRate            = '';
					programAddModalInstanceCtrl.addProgram.placeOfEmployment  = '';
					programAddModalInstanceCtrl.addProgram.employerAddress    = '';
					programAddModalInstanceCtrl.addProgram.jobPosition        = '';
					programAddModalInstanceCtrl.addProgram.unemploymentReason = '';
					//options: 
					programAddModalInstanceCtrl.addProgram.programName         = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.tuitionPaid         = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.graduate            = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.notGraduatingReason = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.passedExam          = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.numberOfTries       = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.noPassReason        = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.jobPlaced           = 'noneSelected';
					programAddModalInstanceCtrl.addProgram.weeklyWorkHours     = 'noneSelected';
				}
			};

			programAddModalInstanceCtrl.dummyData = function() {
				programAddModalInstanceCtrl.addProgram.programRotation    = 52;
				programAddModalInstanceCtrl.addProgram.programStartDate   = '08/24/2017';
				programAddModalInstanceCtrl.addProgram.programEndDate     = '10/19/2017';
				programAddModalInstanceCtrl.addProgram.programTuition     = 2386;
				programAddModalInstanceCtrl.addProgram.payRate            = 'N/A';
				programAddModalInstanceCtrl.addProgram.placeOfEmployment  = 'N/A';
				programAddModalInstanceCtrl.addProgram.employerAddress    = 'N/A';
				programAddModalInstanceCtrl.addProgram.jobPosition        = 'N/A';
				programAddModalInstanceCtrl.addProgram.unemploymentReason = 'N/A';
				//options: 
				programAddModalInstanceCtrl.addProgram.programName         = 'CNA';
				programAddModalInstanceCtrl.addProgram.tuitionPaid         = 'true';
				programAddModalInstanceCtrl.addProgram.graduate            = '';
				programAddModalInstanceCtrl.addProgram.notGraduatingReason = 'Still_in_program';
				programAddModalInstanceCtrl.addProgram.passedExam          = '';
				programAddModalInstanceCtrl.addProgram.numberOfTries       = 'N/A';
				programAddModalInstanceCtrl.addProgram.noPassReason        = 'Have_not_taken_exam';
				programAddModalInstanceCtrl.addProgram.jobPlaced           = '';
				programAddModalInstanceCtrl.addProgram.weeklyWorkHours     = 'N/A';
		}

		}

}());
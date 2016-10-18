(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB'])
		.controller('userDropdownControl', ['$scope', dropdownCtrl]);
	
	angular.module('myApp.userDropdown')
		.controller('signInModalControl', ['$scope', '$uibModal', '$log', signInModalControl])
		.controller('signUpModalControl', ['$scope', '$uibModal', '$log', signUpModalControl])
		.controller('signInModalInstanceController', ['$scope', '$uibModalInstance', signInModalInstanceController])
		.controller('signUpModalInstanceController', ['$scope', '$uibModalInstance', '$http', signUpModalInstanceController]);
				//empty controller, needed for dropdown action
				function dropdownCtrl($scope) {
				
				}
				//controller function for signInModalInstanceController
				function signInModalInstanceController($scope, $uibModalInstance) {
					var signInModalInstanceCtrl = this;
					signInModalInstanceCtrl.ok = function () {//these couple of functions names could be changed
					    $uibModalInstance.close('hello');
					};
					signInModalInstanceCtrl.cancel = function () {
		    			$uibModalInstance.dismiss('cancel');
		  			};
				}
				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, $uibModalInstance, $http) {//these couple of functions names could be changed
					var signUpModalInstanceCtrl = this;
					signUpModalInstanceCtrl.ok = function () {
						var postData = {
							email: signUpModalInstanceCtrl.email,
							password: signUpModalInstanceCtrl.password,
							confirmPassword: signUpModalInstanceCtrl.confirmPassword
						};
						$http.post('/signUp', postData).then(function(successResponse) {
							console.log(successResponse);
						}, function(failureResponse) {
							console.log('failureResponse');
						});
					};

					
				}
				//function for signInModalControl
				function signInModalControl($scope, $uibModal, $log) {
					var self = this;
					this.animationsEnabled = true;
			   	    this.openModal = function (size) {
					    var modalInstance = $uibModal.open({
					      animation: this.animationsEnabled,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/userDropdown/view/english/signIn/signInModal.html', 
					      controller: 	'signInModalInstanceController',
					      controllerAs: 'signInModalInstanceCtrl',
					      size: size,
					      resolve: {//maybe resolve user data from cookies?
					        user: function () {
					          return;
					        }
					      }
					    });

					    modalInstance.result.then(function () {	//when modal is closed 

					      //do something when the modal is closed
					      console.log('hello world from signInmodalInstance result promise');//logs it onto the client
					    }, function () {	//when the modal is dismissed by cancel
					      $log.info('Modal dismissed at: ' + new Date());	//logs the modal dimiss time info on client side
					   });
					};
				}
				//function for signUpModalControl
				function signUpModalControl($scope, $uibModal, $log) {
					var self = this;
					this.animationsEnabled = true;
					this. openModal = function(size) {
						var modalInstance = $uibModal.open({
					      animation: this.animationsEnabled,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/userDropdown/view/english/signUp/signUpModal.html', 
					      controller: 	'signUpModalInstanceController',
					      controllerAs: 'signUpModalInstanceCtrl',
					      size: size,
					      resolve: {//maybe resolve user data from cookies?
					        user: function () {
					          return;
					        }
					      }
					    });
					    modalInstance.result.then(function () {	//when modal is closed 
					      //do something when the modal is closed

					      console.log('hello world from signUpmodalInstance result promise');//logs it onto the client
					    }, function () {	//when the modal is dismissed by cancel
					      $log.info('Modal dismissed at: ' + new Date());	//logs the modal dimiss time info on client side
					   });
					}
				}

}());
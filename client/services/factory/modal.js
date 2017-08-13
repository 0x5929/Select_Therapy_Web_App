(function() {
	'use strict';
	angular.module('services.modalService', ['services.looksIntegrationByUIB'])
		.factory('modalFactory', ['$rootScope', '$uibModal', modalFactoryHandler]);

		function modalFactoryHandler($rootScope, $uibModal) {
					var services = {
						signInModalService    : signInModalService,
						signUpModalService    : signUpModalService,
						addProgramModalService: addProgramModalService
					};

					function assignCurrentUser(user) {
						$rootScope.currentUser = user;
						return user;
					}

					function signInModalService () {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Home/view/signIn/signInModal.html', 
					      controller: 	'signInModalInstanceController',
					      controllerAs: 'signInModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then(assignCurrentUser);
					}

					function signUpModalService () {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Home/view/signUp/signUpModal.html', 
					      controller: 	'signUpModalInstanceController',
					      controllerAs: 'signUpModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then(assignCurrentUser);
					}

					function addProgramModalService(programArr) {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Admin/view/modalView/addProgramModal.html', 
					      controller: 	'programAddModalInstanceController',
					      controllerAs: 'programAddModalInstanceCtrl',
					      // bindToController: true,
					      // scope: $scope,
					      backdrop: true,
					      resolve: {
					      	program: function() {
					      		return programArr;
					      	}
					      },
					      size: 'lg'

						});

						return modalInstance.result
									.then(function(successResponse) {
							//return the addprogramObj to back to the controller promise to handle
							console.log('MODAL CLOSED');
									return successResponse;
								}, function(failureResponse) {
									console.log('MODAL DISMISSED', failureResponse);
									return;	//does not return the failure response because rejections does not get routed to the promise that calls this
								});
					}

					return services;
		}
}());
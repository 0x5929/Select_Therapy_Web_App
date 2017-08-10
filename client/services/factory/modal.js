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

					function addProgramModalService($scope) {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Admin/view/modalView/addProgramModal.html', 
					      controller: 	'adminAddController',
					      controllerAs: 'admin_add_ctrl',
					      bindToController: true,
					      scope: $scope,
					      size: 'lg'

						});

						return modalInstance.result.then(function(result) {

							//result will not be passed in this time for this promise, 
							//so just return the function
							return;
						});
					}

					return services;
		}
}());
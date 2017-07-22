(function() {
	'use strict';
	angular.module('services.modalService', ['services.looksIntegrationByUIB'])
		.factory('modalFactory', ['$rootScope', '$uibModal', modalFactoryHandler]);

		function modalFactoryHandler($rootScope, $uibModal) {
					var services = {
						loginModalService: loginModalService,
						signUpModalService: signUpModalService,
						PrivacyPolicyModalService: PrivacyPolicyModalService,
						TermsOfUseModalService: TermsOfUseModalService
					};

					function assignCurrentUser(user) {
						$rootScope.currentUser = user;
						return user;
					}

					function loginModalService () {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Header/view/main_nav/userDropdown/signIn/signInModal.html', 
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
					      templateUrl: 'app/Header/view/main_nav/userDropdown/signUp/signUpModal.html', 
					      controller: 	'signUpModalInstanceController',
					      controllerAs: 'signUpModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then(assignCurrentUser);
					}

					function PrivacyPolicyModalService() {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Footer/view/privacyPolicy.html', 
					      controller: 	'privacyPolicyModalInstanceController',
					      controllerAs: 'privacyPolicyModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then();
					}

					function TermsOfUseModalService() {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/Footer/view/termsOfUse.html', 
					      controller: 	'termsOfUseModalInstanceController',
					      controllerAs: 'termsOfUseModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then();
					}

					return services;
		}
}());
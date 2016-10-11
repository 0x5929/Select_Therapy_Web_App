(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB'])
		.controller('userDropdownControl', ['$scope', dropdownCtrl]);
		//empty controller, needed for dropdown action
		function dropdownCtrl($scope) {
		
		}
	
	angular.module('myApp.userDropdown')
		.controller('userModalControl', ['$scope', '$uibModal', '$log', userModalCtrl])
		.controller('ModalInstanceController', ['$scope', '$uibModalInstance', ModalInstanceController]);
	//controller function for modalinstance
				function ModalInstanceController($scope, $uibModalInstance) {
					var ModalInstanceCtrl = this;
					ModalInstanceCtrl.ok = function () {
					    $uibModalInstance.close('hello');
					};
					ModalInstanceCtrl.cancel = function () {
		    			$uibModalInstance.dismiss('cancel');
		  			};
				}
	//function for userModalCtrl
	function userModalCtrl($scope, $uibModal, $log) {
		var self = this;
		this.animationsEnabled = true;
   	    this.openModal = function (size) {
		    var modalInstance = $uibModal.open({
		      animation: this.animationsEnabled,
		      ariaLabelledBy: 'modal-title',
		      ariaDescribedBy: 'modal-body',
		      templateUrl: 'app/userDropdown/view/english/signIn/signInModal.html', 
		      controller: 	'ModalInstanceController',
		      controllerAs: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {//maybe resolve user data from cookies?
		        user: function () {
		          return;
		        }
		      }
		    });

		    modalInstance.result.then(function () {	//when modal is closed 
		      //do something when the modal is closed
		      console.log('hello world from modalInstance result promise');//logs it onto the client
		    }, function () {	//when the modal is dismissed by cancel
		      $log.info('Modal dismissed at: ' + new Date());	//logs the modal dimiss time info on client side
		   });
		};
	}

}());
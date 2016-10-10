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
					    $uibModalInstance.close(ModalInstanceCtrl.selected.item);
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
		      resolve: {
		        user: function () {
		          return;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      this.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		   });
		};
	}

}());
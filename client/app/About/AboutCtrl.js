(function() {
	'use strict';

	angular.module('myApp.About', [])
		.controller('AboutCtrl', ['$scope', '$http', AboutCtrl]);
		
		function AboutCtrl($scope, $http) {
		$scope.openPDF = function(PDFID) {
			$http.get('/About' + PDFID, {responseType: 'arraybuffer'}).success(function(data) {
				var file = new Blob([data], {type: 'application/pdf'});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			});
	};
	}
}());
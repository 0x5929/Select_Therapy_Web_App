(function() {
	'use strict';
	angular.module('myApp.home', ['services.looksIntegrationByUIB'])
		.controller('carouselController', ['$scope', carouselCtrlHandler]);

		function carouselCtrlHandler($scope) {
			var carouselCtrl = this;
			carouselCtrl.myInterval = 5000;
			//need to be set up with pictures
			carouselCtrl.slides = [
				{
					image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXkcuQVRJQldwSaEEK-L83KQeEYyQVjIv9sxXCGQd4RRetObnT2w',
					text: 'First pic'
				}
			]; 
		}
}());
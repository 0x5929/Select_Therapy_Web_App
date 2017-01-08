(function() {
	'use strict';
	angular.module('myApp.home', ['ui.bootstrap'])
		.controller('carouselController', ['$scope', carouselCtrlHandler]);

		function carouselCtrlHandler($scope) {
			var carouselCtrl = this;
			var numOfImg = 10;
			var currIndex = 0;
			carouselCtrl.myInterval = 3000;
			//need to be set up with pictures
			var slides = carouselCtrl.slides = [];
				
			carouselCtrl.addSlide = function() {
    			var newWidth = 600 + slides.length + 1;
    			slides.push({	//what if the location is using windows command and need a backslash instead '\' ?
      				image: 'client/app/Home/view/images/test.jpg',
				    text: ['Rotation 1','Rotation 2', 'Rotation 3', 'Rotation 4', 'Rotation 5', 'Rotation 6', 'Rotation 7', 'Rotation 8', 'Rotation 9', 'Rotation 10'][slides.length % numOfImg],
    				id: currIndex++
    			});
  			};

 			for (var i = 0; i < numOfImg; i++) {
				carouselCtrl.addSlide();
			}
			
		}
}());
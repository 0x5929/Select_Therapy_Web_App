(function() {
	'use strict';
	angular.module('myApp.home', ['ui.bootstrap'])
		.controller('carouselController', ['$scope', carouselCtrlHandler]);

		function carouselCtrlHandler($scope) {
			var carouselCtrl = this;
			var numOfImg = 1;
			var currIndex = 0;
			carouselCtrl.myInterval = 5000;
			//need to be set up with pictures
			carouselCtrl.slides = [];
				console.log('why wont i work');
				
			carouselCtrl.addSlide = function() {
				console.log('why wont i work inside addSlide');
    			var newWidth = 600 + carouselCtrl.slides.length + 1;
    			carouselCtrl.slides.push({	//what if the location is using windows command and need a backslash instead '\' ?
      				image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS-5gi_vcEp_i_GNntYeaOtybGBsnUY0870HH62XAc5xlBd9rrlaGEHoHxc',
				    text: ['Rotation 1','Rotation 2', 'Rotation 3', 'Rotation 4', 'Rotation 5', 'Rotation 6', 'Rotation 7', 'Rotation 8', 'Rotation 9', 'Rotation 10'][carouselCtrl.slides.length % 1],
    				id: currIndex++
    			});
  			};
 			console.log('right before for');
 			for (var i = 0; i < 1; i++) {
 				console.log(i);
				carouselCtrl.addSlide();
			}
			console.log('right after for');
			
		}
}());
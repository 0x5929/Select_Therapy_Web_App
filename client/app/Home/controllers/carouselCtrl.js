(function() {
	'use strict';
	angular.module('myApp.home', ['ngAnimate', 'ui.bootstrap'])
		.controller('carouselController', ['$scope', carouselCtrlHandler]);

		function carouselCtrlHandler($scope) {
			var carouselCtrl = this;
			var numOfImg = 1;
			carouselCtrl.myInterval = 5000;
			//need to be set up with pictures
			carouselCtrl.slides = [{image: 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/03/1458289957powerful-images3.jpg'}];
			console.log(this);
				console.log('why wont i work');
				/*
			carouselCtrl.addSlide = function() {
				console.log('why wont i work inside addSlide');
    			var newWidth = 600 + slides.length + 1;
    			slides.push({	//what if the location is using windows command and need a backslash instead '\' ?
      				image: '/client/app/Home/view/test' + newWidth + '/300',
				    text: ['Rotation 1','Rotation 2', 'Rotation 3', 'Rotation 4', 'Rotation 5', 'Rotation 6', 'Rotation 7', 'Rotation 8', 'Rotation 9', 'Rotation 10'][slides.length % numOfImg]
    			});
  			};
 			console.log('right before for');
 			for (var i = 0; i < carouselCtrl.numOfImg; i++) {
 				console.log(i);
				carouselCtrl.addSlide();
			}
			console.log('right after for');
			*/
		}
}());
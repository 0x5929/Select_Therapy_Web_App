(function() {
	'use strict';
	angular.module('myApp.home', ['ui.bootstrap'])
		.controller('carouselController', ['$scope', carouselCtrlHandler]);

		function carouselCtrlHandler($scope) {
			var carouselCtrl = this;
			carouselCtrl.myInterval = 3000;
			//need to be set up with pictures
			var slides = carouselCtrl.slides = [
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 1',
					id: 0
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 2',
					id: 1
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 3',
					id: 2
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 4',
					id: 3
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 5',
					id: 4
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 6',
					id: 5
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 7',
					id: 6
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 8',
					id: 7
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 9',
					id: 8
				},
				{
					image: 'app/Home/view/images/test.jpg',
					text: 'Rotation 10',
					id: 9
				}
			];
		}
}());
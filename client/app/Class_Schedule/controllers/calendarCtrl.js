(function(){
	'use strict';

	angular.module('myApp.classSchedule', ['ui.calendar', 'ui.bootstrap'])
		.controller('calendarController', ['$scope', calendarControlHandler]);

	function calendarControlHandler($scope) {
		//config object
		var calendarCtrl = this;
		calendarCtrl.uiConfig = {
			calendar: {
				googleCalendarApiKey: 'AIzaSyDF5FLbmUL2esV4eiQhewws-BtfC49ftmU', 
				height: 450,
				editable: false,
				header: {
					left: 'month basicWeek basicDay agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				},
				eventClick: calendarCtrl.alertEventOnClick,
				eventDrop: calendarCtrl.alertOnDrop,
				eventResize: calendarCtrl.alertOnResize
			}
		};
		calendarCtrl.eventSources = [
			{
				googleCalendarId: 'https://calendar.google.com/calendar/embed?src=yeruiinstitute%40gmail.com&ctz=America/Los_Angeles'
			}
		];
	}

}());
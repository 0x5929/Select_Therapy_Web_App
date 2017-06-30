(function() {

	'use strict';

	module.exports = googleSheetService;

	function googleSheetService(googleapi, googleAuth, async) {
		var service = {
			sheetHelper: sheetHelperHandler	//constructor with google api sheets obj by using this.service
											//all newly constructed obj from sheethelper will have its own individual google sheet with its own auth token
											//but all newly constructed obj from sheethelper will share the protrotype functions such as create, and sync spreadsheet
		};

		var COLUMNS = {	//TODO: replace the placeholders for each columns with format: [{field: '', header: ''}]
			CNAPerformance: [],
			HHAPerformance: [],
			SGPerformance : [],
			CNASTRF       : [],
			HHASTRF       : [],
			SGSTRF        : []
		};


		//ALSO NEED TO CREATE A CURRENT YEAR SHEETS FOR ALL SHEETS

		//adding prototype for sheetHelper
		service.sheetHelper.prototype.syncData      = syncDataHandler;
		service.sheetHelper.prototype.appendValue   = appendValueHandler;
		service.sheetHelper.prototype.createSheet   = createSheetHandler;
		// service.sheethelper.prototype.dataOrganizer = dataOrganizerHandler;

		//build row for google data: 
			//this function below, lets test if the syncdatahandler can access it, it should, 
			//and if it does, just use the same function as append value
		function syncValue(data) {
			var values = [];	//declaration and initialization of returned value 
			var row = [];
			for (var key in data) {
				if (key === 'spreadsheetID')	continue;
				if (key === 'title')	continue;
				row.push(data[key]);
			}

			values.push(row);
			console.log(values);
			return values;	//values need to be in array for  //returned value
		}

		//handers: 
		function sheetHelperHandler(accessToken) {
			var authClient   = new googleAuth();
			var auth         = new authClient.OAuth2();
			auth.credentials = {
				access_token: accessToken
			};
			this.service = googleapi.sheets({version: 'v4', auth: auth});
		};


		/**
			The following is the logic for sync data: 
			@param1 google data from CLIENT [{sheet}] form
			@param2 database for google data [{sheet}] form
			@param3 callback for handler in router

			Match the correct google data with the corresponding db for google data
				matching using title, or spreadsheet id
			then call batchupdate to update the google sheets with the new google data from client
			using the information such as range, spreadsheet id in the db for google data info


		*/

		function syncDataHandler(data, dbData callback) {
			var valueInputOption = 'USER_ENTERED';	
			var range            = range;	//give a huge range, so it will always append to the given table inside since there is only one
			var majorDimension   = 'ROWS';

			var request = {
				spreadsheetId: spreadsheetID,
				resource: {
					valueInputOption: valueInputOption,
					data            : [
						{
							range         : range,
							majorDimension: majorDimension,
							values        : syncValue(data)
						}
					]
				}

			};
			 
			this.service.spreadsheets.value.batchUpdate(request, function(err, response) {
				if (err) {
					console.log('HELLO WORLD ERR AT GOOGLESHEETJS LINE 85: ', err);
					return callback(err);
				}
				return callback(null, response);
			});
		
		}

		function createSheetHandler() {	//TODO: fill in the handler for create sheet for the new year

		}

		function appendValueHandler(data, callbackForGoogleService, callbackForDBCheck) {
			var sheetHelperServiceAppend = this;
			var valueInputOption = 'USER_ENTERED';
			var insertDataOption = 'INSERT_ROWS';	//it doesnt really matter with append, it will add new row and append data
			// var range            = "Sheet1!A1:Q50000";	//give a huge range, so it will always append to the given table inside since there is only one
			var majorDimension   = 'ROWS';
			// var spreadsheetID, postData, request, dbData, dbCheck;

	

			async.forEachOfSeries(data, iteratee, asyncCallback);

			function iteratee(value, index, callback) {
				var spreadsheetID, postData, request, dbData, dbCheck;
				spreadsheetID    = value['spreadsheetID'];
				postData         = value;
				request = {
					spreadsheetId   : spreadsheetID,
					range           : getRange(postData) + "!A1:Z500000",	
					valueInputOption: valueInputOption,
					insertDataOption: insertDataOption,
					resource        : {
						range         : getRange(postData) + "!A1:Z500000",
						majorDimension: majorDimension,
						values        : appendValues(postData)
					}
				};

				dbData = {
					title: value['title'],
					spreadsheetID: spreadsheetID
				};
				dbCheck = {
					dataLength: data.length,
					index: index
				}

				sheetHelperServiceAppend.service.spreadsheets.values.append(request, googleAppendHandler);	
				
				function googleAppendHandler(err, response) {
					if (err){
						console.log('HELLO WORLD ERR AT GOOGLESHEETS 111: ', err);
						return callbackForGoogleService(err);
					}else {
						callbackForGoogleService(null, response, dbData);
						callbackForDBCheck(dbCheck.dataLength, dbCheck.index);	
						return callback();	//invoking callback for async lib for the next async call
					}			
				}			
			}

			function asyncCallback(err) {
				if (err)	console.log(err);
			}




			//lets go through data and append all sheets:
				//using for loop for performance boost
			// for (var i = 0; i < data.length; i++){
			// 	spreadsheetID    = data[i]['spreadsheetID'];
			// 	postData         = data[i];
			// 	request = {
			// 		spreadsheetId   : spreadsheetID,
			// 		range           : getRange(postData) + "!A1:Z500000",	
			// 		valueInputOption: valueInputOption,
			// 		insertDataOption: insertDataOption,
			// 		resource        : {
			// 			range         : getRange(postData) + "!A1:Z500000",
			// 			majorDimension: majorDimension,
			// 			values        : appendValues(postData)
			// 		}
			// 	};

			// 	dbData = {
			// 		title: data[i]['title'],
			// 		spreadsheetID: spreadsheetID
			// 	};
			// 	dbCheck = {
			// 		dataLength: data.length,
			// 		index: i
			// 	}
			// 	this.service.spreadsheets.values.append(request, googleAppendHandler);
			// }

			// function googleAppendHandler(err, response) {
			// 	if (err){
			// 		console.log('HELLO WORLD ERR AT GOOGLESHEETS 110: ', err);
			// 		return callbackForGoogleService(err);
			// 	}else {
			// 		callbackForGoogleService(null, response, dbData);
			// 		return callbackForDBCheck(dbCheck.dataLength, dbCheck.index);	
			// 	}			
			// }

			function getRange(data) {
				//passing in data, and get range according to title
				switch (data.title){
					case 'CNAPerformance' : return "Sheet1"; //get current year for cna performance
					case 'CNASTRF'        : return "Sheet2"; //get current year for cna strf
					// case 'HHAPerformance' :
					// case 'HHASTRF'        :
					// case 'SGPerformance'  :
					// case 'SGSTRF'         :
					// case 'ESOLPerformance':
					// case 'ESOLSTRF'       :
				}  
			}

		}


		/**
		* ORGANIZES THE DATA PASSED IN FROM CLIENT SIDE, ESPEICALLY THE COURSE TITLE, AND ADDED IN A SPREADSHEETID
		* maybe this whole functin needs to be a route middleware, so it can properly pass in course spreadsheetID
		* @PARAMS data passed in from client side
		* @RETURN data in array form with course properly organized, and spreadID as well
		*/
		
		function dataOrganizerHandler(data) {
			//first: grab all the course in course arr
			// for (var spreadSheetkey in data) {
			// 	if (spreadSheetkey === 'annualReport') {
			// 		for (var annualReportKey in data[spreadSheetkey]){
			// 			if (annualReportKey === 'course'){
			// 				data[spreadSheetkey][annualReportKey] = data[spreadSheetkey][annualReportKey][0];	//setting data to CNA atm
			// 				//NEED TO FIGURE OUT A BETTER WAY TO HAVE ALL THE SHEETS TO BE ORGANIZED BY ITS PROGRAM NAME 
			// 			}
			// 		}
			// 	}
			// }
			var returnedData = [];
			var performanceReport = data.annualReport;
			var STRF = data.STRF;
			if (data.annualReport && data.annualReport.course){
				for (var i = 0; i < data.annualReport.course.length; i++){
					if (data.annualReport.course[i] === 'Nurse Assistant'){
						performanceReport.course           = 'Nurse Assistant';
						performanceReport.spreadsheetID    = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';		//this can be switched to spreadsheet ID
						STRF.course                        = 'Nurse Assistant';
						STRF.spreadsheetID                 = '';
						STRF.spreadSheetTitle              = 'Nurse Assistant';
					}else if (data.annualReport.course[i] === 'Home Health Aide'){

					}else if (data.annualReport.course[i] === 'Security Guard'){

					}else if (data.annualReport.course[i] === 'ESOL'){

					}
				}
			}
			returnedData.push(performanceReport);
			returnedData.push(STRF); 	//this can be improved to have the returned data indicate which spreadsheet
										//possibly by using a switch statement
			return returnedData;
		}

		//buildRowData & createHeader functionalities
		function appendValues(data) {
			var values = [];	//declaration and initialization of returned value 
			var row = [];
			for (var key in data) {
				if (key === 'spreadsheetID')	continue;
				if (key === 'title')	continue;
				row.push(data[key]);
			}

			values.push(row);
			console.log(values);
			return values;	//values need to be in array for  //returned value
		}

		function buildRowData() {}
		function createHeader() {}

		return service;
	}


}());
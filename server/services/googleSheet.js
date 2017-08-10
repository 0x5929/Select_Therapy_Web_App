(function() {

	'use strict';

	module.exports = googleSheetService;

	function googleSheetService(googleapi, googleAuth, async) {
		var service = {
			sheetHelper: sheetHelperHandler	//constructor with google api sheets obj by using this.service
											//all newly constructed obj from sheethelper will have its own individual google sheet with its own auth token
											//but all newly constructed obj from sheethelper will share the protrotype functions such as create, and sync spreadsheet
		};


		//ALSO NEED TO CREATE A CURRENT YEAR SHEETS FOR ALL SHEETS

		//adding prototype for sheetHelper
		service.sheetHelper.prototype.syncData      = syncDataHandler;
		service.sheetHelper.prototype.appendValue   = appendValueHandler;

		//build row for google data: 
			//this function below, lets test if the syncdatahandler can access it, it should, 
			//and if it does, just use the same function as append value
		function syncValue(data) {
			var values = [];	//declaration and initialization of returned value 
			var row = [];
			for (var key in data) {
				if (key === 'spreadsheetID')	continue;
				if (key === 'title')	continue;
				if (key === 'range')	continue;
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
			@param4 callback for database handler in router

			Match the correct google data with the corresponding db for google data
				matching using title, or spreadsheet id
			then call batchupdate to update the google sheets with the new google data from client
			using the information such as range, spreadsheet id in the db for google data info


		*/

		function syncDataHandler(data, dbData, callbackForGoogleUpdate, callbackForDbUpdate) {
			var sheetHelperServiceSync = this;
			var valueInputOption = 'USER_ENTERED';	
			var majorDimension   = 'ROWS';

			for (var i = 0; i < dbData.length; i++){	//comparison and setting the range
				for (var j = 0; j < data.length; j++){
					if (data[j]['title'] === dbData[i]['title']){
						data[j]['range'] = dbData[i]['range'];
					}
				}
			}

			async.forEachOfSeries(data, iteratee, asyncCallback);

			/*
				Async foreachofSeries function: 
				@param1  is data [] form 
				@param2 iteratee function: 
					@param1: value of the data[index]
					@param2: index
					@param3: callback function
			*/

			function iteratee(value, index, callback) {	
				var spreadsheetID, postData, request;
				spreadsheetID = value['spreadsheetID'];
				postData = value;
				request = {
					spreadsheetId: spreadsheetID,
					resource: {
						valueInputOption: valueInputOption,
						data            : [
							{
								range         : value['range'],
								majorDimension: majorDimension,
								values        : syncValue(postData)
							}
						]
					}

				};

				sheetHelperServiceSync.service.spreadsheets.values.batchUpdate(request, googleSyncHandler);

				function googleSyncHandler(err, response){
					if (err) return callbackForGoogleUpdate(err);
					callbackForGoogleUpdate(null, response);
					callbackForDbUpdate(data.length, index);
					return callback();
				}

			}

			function asyncCallback(err) {
				if (err)	
					console.log('HELLO WORLD ERR AT GOOGLE SYNC DATA ASYNC OPERATION: ', err);
			}
		
		}

		function appendValueHandler(data, callbackForGoogleService, callbackForDBAdd) {
			var sheetHelperServiceAppend = this;
			var valueInputOption = 'USER_ENTERED';
			var insertDataOption = 'INSERT_ROWS';	//it doesnt really matter with append, it will add new row and append data
			var majorDimension   = 'ROWS';
			// var spreadsheetID, postData, request, dbData, dbCheck;

			//NEED TO CHECK FOR CURRENT YEAR

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
						values        : syncValue(postData)
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
						callbackForDBAdd(dbCheck.dataLength, dbCheck.index);	
						return callback();	//invoking callback for async lib for the next async call
					}			
				}			
			}

			function asyncCallback(err) {
				if (err)	console.log(err);
			}


			//this function needs to be modified for production mode
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

		return service;
	}


}());
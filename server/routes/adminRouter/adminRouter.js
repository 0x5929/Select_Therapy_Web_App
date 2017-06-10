(function() {
	'use strict';
	//this whole route can be encapsulated into smaller files
	module.exports = adminRouterHandler;
	function adminRouterHandler (fs, express, app, path, bodyParser, officeGenDocxConstruct, configOG, 
								signInSheetService, contactListService, adminFolderDocGenerate, googleSheetService) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//main Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.get('/search/generateSignIn', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('/search/generateContactList', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.post('/add', adminAddPostParseMiddleware, assignRowNumberMiddleware, adminAddPostHandler, googleSyncMiddleware);	//order can be switched
		// adminRoute.put('/modify', adminModifyPutHandler);	//could be deleted as well
		adminRoute.post('/GoogleSync', adminGoogleSyncHandler);
		adminRoute.delete('/delete/:id', adminModifyDeleteHandler);
		
		//handler and middleware functions used in routes


/**********************************************************
ADMIN SEARCH GET HANDLER
REST: GET
***********************************************************/
		function adminSearchGetHandler(req, res, next) {
			var searchParameter = req.query.parameter;
			var searchInput = req.query.input;
			var searchProgram = req.query.program;
			var searchRotation = req.query.rotation;

			if (searchParameter && searchInput){	//if searching by student info
				if (searchParameter === 'Name') {
					searchInput = searchInput.toLowerCase();
					STIDbStudentCollection.findOne({'name': searchInput}, function(err, user) {
						if (err) return next(err);
						if (user) return res.status(200).send(user).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}else if (searchParameter === 'email') {
						STIDbStudentCollection.findOne({'email': searchInput}, function(err, user) {
						if (err) return next(err);
						if (user) return res.status(200).send(user).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}else if (searchParameter === 'Phone number'){
						STIDbStudentCollection.find({'phoneNumber': searchInput}, function(err, users) {
						if (err) return next(err);
						if (users) return res.status(200).send(users).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}				
			}else if (searchProgram && searchRotation){	//if searching by program info
				STIDbStudentCollection.find()
					.elemMatch('program', {'programName': searchProgram, 'programRotation': searchRotation})
						.exec(function(err, results) {
							if (err) return next(err);
							if (results) return res.status(200).send(results).end();
							console.log('testing @ adminRouter, for searching by program rotations: ', results);
						});				
			}else return res.status(400).send('invalid entry').end();	//last condition for err handle
		}




/*********************************************************************************
ADMIN SEARCH GET SIGN IN SHEET HANDLER + HEADER MIDDLEWARE + OFFICEGEN MIDDLEWARE
REST: GET
**********************************************************************************/

		function headerMiddleware(req, res, next) {
			//grabbing functionality params
			var functionality = req.query.functionality;
			//route check
			if (functionality === 'signInSheet') {
				//setting the content type, and content disposition
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=Sign_In_Sheet.docx');				
			}else if (functionality === 'contactList') {
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=Contact_List.docx');				
			}
			

			next();			
		}


		function officeGenGetHandlerMiddleware(req, res, next) {
			//grabbing all params from client
			var studentNames    = req.query.studentNames;	
			var programName     = req.query.programName;
			var programRotation = req.query.programRotation;
			var functionality   = req.query.functionality;
			
			//document settings: 
			var documentSetting = {
				signInSheetDocDescription: 'Sign_In_Sheet',
				signInSheetDocSubject    : 'Sign_In_Sheet',
				signInSheetDocKeywords   : 'Sign_In_Sheet',
				contactListDocDescription: 'Contact_List',
				contactListDocSubject    : 'Contact_List',
				contactListDocDescription: 'Contact_List',
				examEmploymentSheetName  : 'Exam_Employment'
			};

			//headParagraph setting
			var headerParagraphSetting = {
				alignment  : 'center',
				boldSetting: true,
				fontFace   : 'Times New Roman',
				fontSize   : 20,	//MS Font size standard,,
				companyName: 'Select Thearpy Instiute, Inc',
				title      : evaluateTitle
			};

			function evaluateTitle(evaulatedProgramName) {
				switch (evaulatedProgramName) {
					case 'CNA' :	return 'Nurse Assistant Program';
					case 'HHA' :	return 'Home Health Aide Program';
					case 'SG'  :	return 'Security Guard Program';
					case 'ESOL':	return 'ESOL Program';
				}
			}			

			if (functionality === 'signInSheet') {
				var signInSheetDoc = new officeGenDocxConstruct(configOG.officeGen, configOG.docxConfig).myDoc();
				signInSheetDoc.setDocSubject(documentSetting.signInSheetDocDescription);
				signInSheetDoc.setDocKeywords(documentSetting.signInSheetDocSubject);
				signInSheetDoc.setDescription(documentSetting.signInSheetDocKeywords);	

				var headerParagraph           = signInSheetDoc.getHeader().createP();
				headerParagraph.options.align = headerParagraphSetting.alignment;
				headerParagraph.addText(headerParagraphSetting.companyName, //select therapy institute, inc
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});
				headerParagraph.addLineBreak();
				headerParagraph.addText('Sign-In Sheet for ' + headerParagraphSetting.title(programName), 
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});

				//fetch table service:
				var signInSheetHeaderTable = signInSheetService.signInSheetHeaderTable();			
				signInSheetDoc.createTable(signInSheetHeaderTable.tableContent, signInSheetHeaderTable.tableStyle);	//header table generate
				var spacingParagraph       = signInSheetDoc.createP();		// spacingParagraph.addLineBreak();
				var signInSheetBodyTable   = signInSheetService.signInSheetBodyTable(studentNames);
				signInSheetDoc.createTable(signInSheetBodyTable.tableContent, signInSheetBodyTable.tableStyle);	//body table generate'			
			
				signInSheetDoc.generate(res);	

				setTimeout(function() {	
					res.status(200).end();
				}, 3000);	

			}else if (functionality === 'contactList') {
				var contactListDoc = new officeGenDocxConstruct(configOG.officeGen, configOG.docxConfig).myDoc();
				contactListDoc.setDocSubject(documentSetting.contactListDocDescription);
				contactListDoc.setDocKeywords(documentSetting.contactListDocSubject);
				contactListDoc.setDescription(documentSetting.contactListDocDescription);

				//header paragraph
				var headerParagraph           = contactListDoc.getHeader().createP();
				headerParagraph.options.align = headerParagraphSetting.alignment;
				headerParagraph.addText(headerParagraphSetting.companyName, //select therapy institute, inc
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});
				headerParagraph.addLineBreak();
				headerParagraph.addText('Rotation #' + programRotation + ' Contact List', 
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});	
				//fetch table service:	
				var bodyTable = contactListService.contactListBodyTable(studentNames);
				contactListDoc.createTable(bodyTable.tableContent, bodyTable.tableStyle);
				contactListDoc.generate(res);	

				setTimeout(function() {	
					res.status(200).end();
				}, 3000);	

			}	

		}

/**********************************************************
ADMIN ADD HANDLER + PARSE MIDDLEWARE
REST: ADD
***********************************************************/

/*
	THE LOGIC AS FOLLOWS: 
		1. GOOGLE AUTH FIRST
		2. DATA SENT BACK TO SERVER
		3. SYNC WITH GOOGLE SHEET: APPEND
		4. GRAB RESPOND BODY: ROW NUMBER
		5. SAVE ROW NUMBER AND ALL OTHER KEYS TO DB
		6. ONCE MODIFYING, GRAB ROW NUMBER, AND SYNC GOOGLE: UPDATE
		7. ONCE NEW YEAR, SYNC GOOGLE: CREATE NEW SHEET FOR THE YEAR
*/


		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody           = req.body;
			//parse all neccessary fields to be correctly input into db
			requestBody.firstName     = requestBody.firstName.toLowerCase();	//make sure the input names are lowercase into the database
			requestBody.lastName      = requestBody.lastName.toLowerCase();	
			requestBody.phoneNumber   = Number(requestBody.phoneNumber);
			requestBody.ssn           = Number(requestBody.ssn);
			requestBody.payRate       = Number(requestBody.payRate);
			requestBody.numberOfTries = Number(requestBody.numberOfTries);
			requestBody.graduate      = Boolean(requestBody.graduate);
			requestBody.tuitionPaid   = Boolean(requestBody.tuitionPaid);
			requestBody.jobPlaced     = Boolean(requestBody.jobPlaced);
			requestBody.passedExam    = Boolean(requestBody.passedExam);
			if (requestBody.originalName)
				requestBody.originalName = requestBody.originalName.toLowerCase();
			else requestBody.originalName = requestBody.firstName + ' ' + requestBody.lastName;
			requestBody.program.forEach(function(eachProgram) {	//this is to ensure all programs entered into db is capitalized
				eachProgram.programName = eachProgram.programName.toUpperCase();
			});
			//calling next to further handle request
			next();
		}

		function assignRowNumberMiddleware(req, res, next) {
			//check if new user
			//db call to find user
				//if new user assign new row number
				//get current row number
				//new row number = current row number + 1;

		}

		function adminAddPostHandler(req, res, next) {
			STIDbStudentCollection.findOne({'name': req.body.originalName}, function(err, user) {
				if (err) return next(err);
				if (user) {
					for (var userKey in user){	//update user
						for (var requestKey in req.body){
							if (userKey === requestKey)
								user[userKey] = req.body[requestKey];
						}
						if (userKey === 'name')	//updating the name property
							user[userKey] = req.body.firstName + ' ' + req.body.lastName;
					}
					user.save(function(err) {	//need to call next stating its modifying, and update all fields in google
						if (err)	return next(err);
						else return res.status(200).send('STUDENT UPDATED').end();
					});
					console.log('HELLO WORLD ERR AT 278');
					console.log('HELLO WORLD ERR AT 280');

				}
				if (!user) {	//if no user, then save all the creditials from client side
								//need to call next stating its new student, and therefore use append value in sheets api
					var newStudent             = new STIDbStudentCollection();
					newStudent.enrollmentDate  = req.body.enrollmentDate;
					newStudent.studentID       = req.body.studentID;
					newStudent.firstName       = req.body.firstName;
					newStudent.lastName        = req.body.lastName;
					newStudent.name            = req.body.firstName + ' ' + req.body.lastName;
					newStudent.phoneNumber     = req.body.phoneNumber;
					newStudent.ssn             = req.body.ssn;
					newStudent.address         = req.body.address;
					newStudent.email           = req.body.email;
					newStudent.program         = req.body.program;
					newStudent.tuition         = req.body.tuition;
					newStudent.graduate        = req.body.graduate;
					newStudent.tuitionPaid     = req.body.tuitionPaid;
					newStudent.marketingSurvey = req.body.marketingSurvey;		
//depending on whether or not the student graduated, we save the necessary things to the db and check for pass exam and job place condition, 
//and depending on those conditions we save the necessary data into db	
					if (req.body.graduate){	//graduate condition
						newStudent.passedExam = req.body.passedExam;	//saving necesasry properties
						newStudent.jobPlaced  = req.body.jobPlaced;	//saving necesasry properties
						if (req.body.passedExam)	newStudent.numberOfTries = req.body.numberOfTries;	//saving necessary properties depending on pass exam condidtion
						else	newStudent.noPassReason = req.body.noPassReason;	//saving necessary properties depending on pass exam condidtion
						if (req.body.jobPlaced){
							newStudent.weeklyWorkHours   = req.body.weeklyWorkHours;	//depending on whether or not the student is employed, we save the necessary things from front end into the db
							newStudent.payRate           = req.body.payRate;
							newStudent.placeOfEmployment = req.body.placeOfEmployment;
							newStudent.employmentAddress = req.body.employmentAddress;
							newStudent.jobPosition       = req.body.jobPosition;
						}else	newStudent.noJobReason = req.body.noJobReason;	
					}
					else	newStudent.notGraduatingReason = req.body.notGraduatingReason;	//if graduate condition is not met, we then save the none graduate reason
					//save the new student
					newStudent.save(function(err) {
						if (err) return next(err);
						else return res.status(200).send('newStudent added').end();	//could call next() for google sync
					});
				}
			})
		}

		function googleSyncMiddleware(req, res, next) {
			//getting the sheethelper service
			var SheetHelper = googleSheetService.sheetHelper;
			var auth = req.get('Authorization');	//getting authorization
			var data = req.body;
			console.log('HELLO WORLD TESTING AUTHORIZATION: ', auth);
			//check for auth
			if (!auth)	return next('error: Authorization required');
			var accessToken = auth.split(' ')[1]; 	//grabbing token after bearer
			var helper = new SheetHelper(accessToken);	//need to create sheethelper and load it in routes
			//before calling helper.sync, we need to grab the spreadsheet id, and spreadsheet  sheetid from mongodb
			//need to do a query search to the student, and look for its google obj, for its properties for id
			//then pass in all the nesscessary things into the helper.sync function 
			// helper.sync(spreadsheet.id, spreadsheet.sheetId, data, function(err, successResposne) {	//callback function
			// 	if (err) return next(err);
			// 	console.log('WELL DONE, successResposne: ', successResposne);
			// });

		}



/********************************************************************************************
ADMIN MODIFY MODIFY HANDLER
REST: PUT..........................** NEED TO SEE IF WE NEED TO CHANGE THAT TO PATCH INSTEAD
*********************************************************************************************/
//below could be deleted with the new modifying functionaity straight from admin search to admin add

		// function adminModifyPutHandler(req, res, next) {
		// 	console.log(req.body);
		// 	var requestBody = req.body;
		// 	var modifyingKeys = Object.keys(requestBody);
		// 	STIDbStudentCollection.findOne({'name': requestBody.originalName}, function(err, user) {
		// 		if (err) return next(err);
		// 		if (!user) return res.status(500).send("Database or Client side err, cannot find the user's originalName in db").end();
		// 		if (user) {
		// 			modifyingKeys.forEach(function(key) {
		// 				if (key === "originalName") return;	//skipping the original name key
		// 				user[key] = requestBody[key];	//updating the keys
		// 				user.save(function(err, updatedUser) {
		// 					if (err) return next(err);
		// 				});
		// 			});
		// 			return res.send('updatedUser').end();			
		// 		}
		// 	});
		// }



/**********************************************************
ADMIN MODIFY DELETE HANDLER
REST: DELETE
***********************************************************/

		function adminModifyDeleteHandler(req, res, next) {
			var deleteID = req.params.id;
			
			STIDbStudentCollection.findByIdAndRemove(deleteID, function(err) {
				if (err)	return next(err);
				res.status(200).send('testing signal success').end();
			});

		}




/**********************************************************
ADMIN GOOGLE SYNC POST HANDLER
REST: POST
***********************************************************/

		function adminGoogleSyncHandler(req, res, next) {
			console.log('GOOGLE SHEET SERVICE: ', googleSheetService);
			var SheetHelper = googleSheetService.sheetHelper;
			var auth = req.get('Authorization');
			var data = req.body;
			console.log('TESTING DATA: ', data);
			console.log('HELLO WORLD TESTING AUTHORIZATION: ', auth);
			//check for auth
			if (!auth)	return next('error: Authorization required');
			var accessToken = auth.split(' ')[1]; 	//grabbing token after bearer
			STIDbStudentCollection.findOne({'name': data.annualReport.firstName + ' ' + data.annualReport.lastName}, function(err, user) {	//could have the name property in another key like query from client side
				if (err)	return next(err);
				//access its google data
				// need to implement logic: 
				//first user must be saved, and this will retrieve its google data property, which will be properly saved in the first time
				// then retrieving its google data, we can access its row number, and input all current data into sheets with sheet helper
				//ALL THIS COULD BE COMBINED INTO ONE FUNCTIONALITY! SAVE USER AND SYNC TO GOOGLE, EVERYTIME CLIENT SAVES/MODIFYS A USER
				// ONE FUNCTIONALITY?
			});
			var helper = new SheetHelper(accessToken);	//need to create sheethelper and load it in routes
			//before calling helper.sync, we need to grab the spreadsheet id, and spreadsheet  sheetid from mongodb
			//need to do a query search to the student, and look for its google obj, for its properties for id
			//then pass in all the nesscessary things into the helper.sync function 
			// helper.sync(spreadsheet.id, spreadsheet.sheetId, data, function(err, successResposne) {	//callback function
			// 	if (err) return next(err);
			// 	console.log('WELL DONE, successResposne: ', successResposne);
			// });
		}

		return adminRoute;

	}
}());
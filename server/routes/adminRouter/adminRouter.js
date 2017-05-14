(function() {
	'use strict';
	//this whole route can be encapsulated into smaller files
	module.exports = adminRouterHandler;
	function adminRouterHandler (fs, express, app, path, bodyParser, officeGenDocxConstruct, configOG, 
								signInSheetService, contactListService, adminFolderDocGenerate) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//main Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.get('/search/generateSignIn', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('/search/generateContactList', headerMiddleware, officeGenGetHandlerMiddleware);
		// adminRoute.get('/search/generateExamEmploymentSheet', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('/search/testSignal', headerMiddleware, testSignalMiddleware);
		adminRoute.post('/add', adminAddPostParseMiddleware, adminAddPostHandler);
		adminRoute.put('/modify', adminModifyPutHandler);
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
			else if (functionality === 'testSignal') {
				res.setHeader('Content-type', 'application/msword');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=testSignal.doc');		
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

			}	// FUNCTIONAILITIES BELOW NEEDS TO BE IMPLEMENTED WITH THE ADMIN FOLDER
				//NEXT FUNCTIONALITIES:
				//	-ADMIN FOLDER DOC GENERATE
				// 	-GOOGLE SHEETS PUSH DATA
			// else if (functionality === 'examEmploymentSheet') {
			// 	//office gen material for exam employment sheet
			// 	var examEmploymentSheet = new officeGenDocxConstruct(configOG.officeGen, configOG.xlsxConfig).myDoc();
			// 	var currentSheet = examEmploymentSheet.makeNewSheet();	
			// 	currentSheet.name = documentSetting.examEmploymentSheetName;
			// 	//calling emxam employment service
			// 	console.log(studentNames);
			// 	examEmploymentService.examEmploymentSheetGenHandler(currentSheet, studentNames);

			// 	examEmploymentSheet.generate(res);

			// 	setTimeout(function() {	
			// 		res.status(200).end();
			// 	}, 3000);

			
			// }else if (functionality === 'clinicalChecklist') {
			// 	//office gen material for clinical checklist
			// }
			
		}

		function testSignalMiddleware (req, res, next) {
			// var resposne = adminFolderDocGenerate.adminFolderDocService();
			var testhtml = "<!DOCTYPE html><html xmlns:office='urn:schemas-microsoft-com:office:office' xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head> <xml><word:WordDocument><word:View>Print</word:View><word:Zoom>90</word:Zoom><word:DoNotOptimizeForBrowswer/></word:WordDocument></xml></head><body><h3 style='font-weight: bold; line-height: 3%' align='center'> Select Therapy Institute</h3><h3 style='font-weight: bold;' align='center'> Nurse Assitant Program Rotation #</h3><table style='margin-right: auto; margin-left: auto;'><tr><td> Student Name:</td><td> Kevin Test</td></tr><tr><td> Uniform Size:</td><td> M</td></tr></table><table style='margin-right: auto; margin-left: auto;'><td valign='top'><table><tr><td style='font-weight: bold;'> Clinical Checklist</td></tr></table><table border='1' cellspacing='0' cellpadding='15'><tr><td></td><td> High school Diploma</td></tr><tr><td></td><td> English Evaluation</td></tr><tr><td></td><td> 283-1</td></tr><tr><td></td><td> 283-2</td></tr><tr><td></td><td> Fingerprint Scan</td></tr><tr><td></td><td> Physical Exam/TB</td></tr><tr><td></td><td> Liability Insurance</td></tr><tr><td></td><td> CPR</td></tr><tr><td></td><td> Theory Completion</td></tr></table></td><td valign='top'><table><tr><td style='font-weight: bold;'> Theory</td></tr><tr><td style='font-weight: bold;'> Attendance</td></tr></table><table border='1' cellspacing='0' cellpadding='15'><tr><td></td><td> 1</td></tr><tr><td></td><td> 2</td></tr><tr><td></td><td> 3</td></tr><tr><td></td><td> 4</td></tr><tr><td></td><td> 5</td></tr><tr><td></td><td> 6</td></tr><tr><td></td><td> 7</td></tr><tr><td></td><td> 8</td></tr><tr><td></td><td> 9</td></tr><tr><td></td><td> 10</td></tr><tr><td></td><td> 11</td></tr><tr><td></td><td> 12</td></tr><tr><td></td><td> 13</td></tr><tr><td></td><td> 14</td></tr></table></td><td valign='top'><table><tr><td style='font-weight: bold;'> Clinical</td></tr><tr><td style='font-weight: bold;'> Attendance</td></tr></table><table border='1' cellspacing='0' cellpadding='15'><tr><td></td><td> 1</td></tr><tr><td></td><td> 2</td></tr><tr><td></td><td> 3</td></tr><tr><td></td><td> 4</td></tr><tr><td></td><td> 5</td></tr><tr><td></td><td> 6</td></tr><tr><td></td><td> 7</td></tr><tr><td></td><td> 8</td></tr><tr><td></td><td> 9</td></tr><tr><td></td><td> 10</td></tr><tr><td></td><td> 11</td></tr><tr><td></td><td> 12</td></tr><tr><td></td><td> 13</td></tr></table></td><td><div style='word-wrap: break-word;width:10px'> *****************************************</div></td><td width='20' valign='top'><div style='text-decoration: underline;'> Students is eligible for the State Examination if <em>all sections are checked off on the left side of the page, and have a $0 balance with the accounting department</em></div><table style='margin-top: 20px'><tr><td style='font-weight: bold;'> CNA State Examination Info</td></tr></table><table border='1' cellspacing='0' cellpadding='10'><tr><td> Date</td><td> Location</td><td> Written</td><td> Skills</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table><table style='margin-top: 20px'><tr><td style='font-weight: bold;'> Job Placement Info</td></tr></table><table><tr><td><table><tr><td> Facility Name:</td><td></td></tr><tr><td> Contact Name:</td><td></td></tr><tr><td> Phone:</td><td></td></tr><tr><td> Full/Part Time:</td><td></td></tr><tr><td> Pay:</td><td></td></tr></table><table><tr><td> *************************************</td></tr><tr><td> If no job placement, what is the reason:</td></tr><tr><td valign='bottom'> ______________________________________</td></tr></table></td></tr></table></td><td><table border='1' cellspacing='0' cellpadding='0'><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Enrollment Agreement</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Payment Tracker</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Theory Hours</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Clinical Checklist</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Clinical Hours</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Examination Info</div></td></tr><tr><td height='130' width='30' valign='center'><div style='transform: rotate(-90deg); font-weight: bold;'> Job Placement Info</div></td></tr></table></td><tr><td colspan='6'><table border='1' cellspacing='0' cellpadding='0'><tr><td colspan='10' style='font-weight: bold;'> Payment Tracker</td></tr><tr><td> Date</td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td><td width='70'></td></tr><tr><td> Balance</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td> Balance</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td> Payment Type</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td> Payment Amount</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td> Balance</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td> Notes</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></td></tr></table></body></html>";
			res.status(200).send(testhtml).end();
		}



/**********************************************************
ADMIN ADD HANDLER + PARSE MIDDLEWARE
REST: ADD
***********************************************************/

		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody = req.body;
			//parse all neccessary fields to be correctly input into db
			requestBody.name = requestBody.name.toLowerCase();	//make sure the input names are lowercase into the database
			requestBody.phoneNumber = Number(requestBody.phoneNumber);
			requestBody.ssn = Number(requestBody.ssn);
			requestBody.payRate = Number(requestBody.payRate);
			requestBody.numberOfTries = Number(requestBody.numberOfTries);
			requestBody.graduate = Boolean(requestBody.graduate);
			requestBody.tuitionPaid = Boolean(requestBody.tuitionPaid);
			requestBody.jobPlaced = Boolean(requestBody.jobPlaced);
			requestBody.passedExam = Boolean(requestBody.passedExam);
			requestBody.program.forEach(function(eachProgram) {	//this is to ensure all programs entered into db is capitalized
				eachProgram.programName = eachProgram.programName.toUpperCase();
			});
			//calling next to further handle request
			next();
		}

		function adminAddPostHandler(req, res, next) {
			STIDbStudentCollection.findOne({'name': req.body.name}, function(err, user) {
				if (err) return next(err);
				if (user) return res.status(400).send('This user already exists!').end();
				if (!user) {	//if no user, then save all the creditials from client side
					var newStudent             = new STIDbStudentCollection();
					newStudent.enrollmentDate  = req.body.enrollmentDate;
					newStudent.studentID       = req.body.studentID;
					newStudent.name            = req.body.firstName + '' + req.body.lastName;
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
						newStudent.jobPlaced = req.body.jobPlaced;	//saving necesasry properties
						if (req.body.passedExam)	newStudent.numberOfTries = req.body.numberOfTries;	//saving necessary properties depending on pass exam condidtion
						else	newStudent.noPassReason = req.body.noPassReason;	//saving necessary properties depending on pass exam condidtion
						if (req.body.jobPlaced){
							newStudent.weeklyWorkHours = req.body.weeklyWorkHours;	//depending on whether or not the student is employed, we save the necessary things from front end into the db
							newStudent.payRate = req.body.payRate;
							newStudent.jobDescription = req.body.jobDescription;
						}else	newStudent.noJobReason = req.body.noJobReason;	
					}
					else	newStudent.notGraduatingReason = req.body.notGraduatingReason;	//if graduate condition is not met, we then save the none graduate reason
					//save the new student
					newStudent.save(function(err) {
						if (err) return next(err);
					});
				}
			})
			return res.status(200).send('newStudent added').end();
		}




/********************************************************************************************
ADMIN MODIFY MODIFY HANDLER
REST: PUT..........................** NEED TO SEE IF WE NEED TO CHANGE THAT TO PATCH INSTEAD
*********************************************************************************************/

		function adminModifyPutHandler(req, res, next) {
			console.log(req.body);
			var requestBody = req.body;
			var modifyingKeys = Object.keys(requestBody);
			STIDbStudentCollection.findOne({'name': requestBody.originalName}, function(err, user) {
				if (err) return next(err);
				if (!user) return res.status(500).send("Database or Client side err, cannot find the user's originalName in db").end();
				if (user) {
					modifyingKeys.forEach(function(key) {
						if (key === "originalName") return;	//skipping the original name key
						user[key] = requestBody[key];	//updating the keys
						user.save(function(err, updatedUser) {
							if (err) return next(err);
						});
					});
					return res.send('updatedUser').end();			
				}
			});
		}



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

		return adminRoute;
	}
}());
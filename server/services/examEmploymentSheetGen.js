(function(){

	'use strict';

	var examEmploymentService = {
		examEmploymentSheetGenHandler : examEmploymentSheetGenHandler
	};

	function examEmploymentSheetGenHandler (sheetObj, studentNames) {
		//initialize all necessary variables
		var firstRowfirstCell = 'Student Name';
		var firstRowSecondCell = 'Phone Number';
		var firstRowThirdCell = 'Exam Information';
		var firstRowFourthCell = 'Job Placement';
		//first row
			//using setCell
		sheetObj.setCell('A1', firstRowfirstCell);
		sheetObj.setCell('B1', firstRowSecondCell);
		sheetObj.setCell('C1', firstRowThirdCell);
		sheetObj.setCell('D1', firstRowFourthCell);
		// sheetObj[0] = [];
		// sheetObj[0][0] = firstRowfirstCell;
		// sheetObj[0][1] = firstRowSecondCell;
		// sheetObj[0][2] = firstRowThirdCell;
		// sheetObj[0][3] = firstRowFourthCell;
		// console.log('HELLO WORLD I AM IN THE HANDLER:', studentNames);
		// //second row
		// 	//using direct way
		// sheetObj[1] = [];
		// sheetObj[1][0] = studentNames[0] || '';
		// sheetObj[1][2] = '    /     /    ';
		// //third row
		// sheetObj[2] = [];
		// sheetObj[2][0] = studentNames[1] || '';
		// sheetObj[2][2] = '    /     /    ';
		// //fourth row
		// sheetObj[3] = [];
		// sheetObj[3][0] = studentNames[2] || '';
		// sheetObj[3][2] = '    /     /    ';
		// //5th row
		// sheetObj[4] = [];
		// sheetObj[4][0] = studentNames[3] || '';
		// sheetObj[4][2] = '    /     /    ';
		// //6th row
		// sheetObj[5] = [];
		// sheetObj[5][0] = studentNames[4] || '';
		// sheetObj[5][2] = '    /     /    ';
		// //7th row
		// sheetObj[6] = [];
		// sheetObj[6][0] = studentNames[5] || '';
		// sheetObj[6][2] = '    /     /    ';
		// //8th row
		// sheetObj[7] = [];
		// sheetObj[7][0] = studentNames[6] || '';
		// sheetObj[7][2] = '    /     /    ';
		// //9th row
		// sheetObj[8] = [];
		// sheetObj[8][0] = studentNames[7] || '';
		// sheetObj[8][2] = '    /     /    ';
		// //10th row
		// sheetObj[9] = [];
		// sheetObj[9][0] = studentNames[8] || '';
		// sheetObj[9][2] = '    /     /    ';
		// //11th row
		// sheetObj[10] = [];
		// sheetObj[10][0] = studentNames[9] || '';
		// sheetObj[10][2] = '    /     /    ';
		// //12th row
		// sheetObj[11] = [];
		// sheetObj[11][0] = studentNames[10] || '';
		// sheetObj[11][2] = '    /     /    ';
		// //13th row
		// sheetObj[12] = [];
		// sheetObj[12][0] = studentNames[11] || '';
		// sheetObj[12][2] = '    /     /    ';
		// //14th row
		// sheetObj[13] = [];
		// sheetObj[13][0] = studentNames[12] || '';
		// sheetObj[13][2] = '    /     /    ';
		// //15th row
		// sheetObj[14] = [];
		// sheetObj[14][0] = studentNames[13] || '';
		// sheetObj[14][2] = '    /     /    ';
		// //16th row
		// sheetObj[15] = [];
		// sheetObj[15][0] = studentNames[14] || '';
		// sheetObj[15][2] = '    /     /    ';
		// //17th row
		// sheetObj[16] = [];
		// sheetObj[16][0] = studentNames[15] || '';
		// sheetObj[16][2] = '    /     /    ';
		// //18th row
		// sheetObj[17] = [];
		// sheetObj[17][0] = studentNames[16] || '';
		// sheetObj[17][2] = '    /     /    ';
		// //19th row
		// sheetObj[18] = [];
		// sheetObj[18][0] = studentNames[17] || '';
		// sheetObj[18][2] = '    /     /    ';
		// //20th row
		// sheetObj[19] = [];
		// sheetObj[19][0] = studentNames[18] || '';
		// sheetObj[19][2] = '    /     /    ';
		// //21st row
		// sheetObj[20] = [];
		// sheetObj[20][0] = studentNames[19] || '';
		// sheetObj[20][2] = '    /     /    ';
		// //22nd row
		// sheetObj[21] = [];
		// sheetObj[21][0] = studentNames[20] || '';
		// sheetObj[21][2] = '    /     /    ';
		// //23rd row
		// sheetObj[22] = [];
		// sheetObj[22][0] = studentNames[21] || '';
		// sheetObj[22][2] = '    /     /    ';
		// //24th row
		// sheetObj[23] = [];
		// sheetObj[23][0] = studentNames[22] || '';
		// sheetObj[23][2] = '    /     /    ';
		// //25th row
		// sheetObj[24] = [];
		// sheetObj[24][0] = studentNames[23] || '';
		// sheetObj[24][2] = '    /     /    ';
		// //26th row
		// sheetObj[25] = [];
		// sheetObj[25][0] = studentNames[24] || '';
		// sheetObj[25][2] = '    /     /    ';
		// //27th row
		// sheetObj[26] = [];
		// sheetObj[26][0] = studentNames[25] || '';
		// sheetObj[26][2] = '    /     /    ';
		// //28th row
		// sheetObj[27] = [];
		// sheetObj[27][0] = studentNames[26] || '';
		// sheetObj[27][2] = '    /     /    ';
		// //29th row
		// sheetObj[28] = [];
		// sheetObj[28][0] = studentNames[27] || '';
		// sheetObj[28][2] = '    /     /    ';
		// //30th row
		// sheetObj[29] = [];
		// sheetObj[29][0] = studentNames[28] || '';
		// sheetObj[29][2] = '    /     /    ';
		// //31st row
		// sheetObj[30] = [];
		// sheetObj[30][0] = studentNames[29] || '';
		// sheetObj[30][2] = '    /     /    ';
	}

	module.exports = examEmploymentService;

}());
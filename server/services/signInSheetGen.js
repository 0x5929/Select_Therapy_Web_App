(function() {

	'use strict';


	/******************************************************************************

		OFFICE GEN DOCX TABLE RULE
		[
			[
				{FIRST ROW FIRST CELL}, {FIRST ROW SECOND CELL}
			],[
				{SECOND ROW FIRST CELL}, {SECOND ROW SECOND CELL}
			],[
				{THIRD ROW FIRST CELL}, {THIRD ROW SECOND CELL}
			]... ETC
		]

		EACH CONTENT OBJ HAVE VAL, AND OPT PROPERTIES


	*********************************************************************************/


	/**************************************************

	Table styles:  
	opts.cellColWidth is evaluated first,
	then tableOpts.tableColWidth is evalauted second

	**************************************************/

	var officeGenDocxTableService = {	//table of contents for this service object

		signInSheetHeaderTable: signInSheetHeaderTable,
		signInSheetBodyTable  : signInSheetBodyTable
	}

	function signInSheetHeaderTable() {

		var tableContentSetting = {
			leftCellColWidth : 1800,
			rightCellColWidth: 3000,
			fontFamily       : 'Arial',
			fontSize         : 21,	//in pixels, not MS Standard
			alignment        : 'right'

		};

		var tableContent = [	//header table content
			[{	//first row first cell
				val: 'Date',
				opts: {
					cellColWidth: tableContentSetting.leftCellColWidth,	
					sz: tableContentSetting.fontSize,	
					fontFamily: tableContentSetting.fontFamily,
					align: tableContentSetting.alignment
				}
			}, {	//first row second cell
				val: '',
				opts: {
					cellColWidth: tableContentSetting.rightCellColWidth
				}
			}], 
			[{	//second row first cell
				val: 'Class', 
				opts: {
					cellColWidth: tableContentSetting.leftCellColWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily,
					align: tableContentSetting.alignment
				}
			}, {	//second row second cell
				val: '',
				opts: {
					cellColWidth: tableContentSetting.rightCellColWidth
				}
			}],	
			[{	//third row first cell
				val: 'Time Schedule',
				opts: {
					cellColWidth: tableContentSetting.leftCellColWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily,
					align: tableContentSetting.alignment
				}
			}, {	//third row second cell
				val: '',
				opts: {
					cellColWidth: tableContentSetting.rightCellColWidth
				}
			}], 
			[{	//fourth row first cell
				val: 'Instructor',
				opts: {
					cellColWidth: tableContentSetting.leftCellColWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily,
					align: tableContentSetting.alignment
				}
			}, {	//fourth row second cell
				val: '',
				opts: {
					cellColWidth: tableContentSetting.rightCellColWidth
			}
			}]];

		var tableStyle = {	//header table style
			tableAlign: "left",
			borders   : true
		};

		var configs = {
			tableContent: tableContent,
			tableStyle  : tableStyle
		};

		return configs;
	}

	function signInSheetBodyTable(studentNames) {


		var tableContentSetting = {
			firstColCellWidth         : 100,
			secondColCellWidth        : 2000,
			thirdAndFifthColCellWidth : 2300,
			fourthAndSixthColCellWidth: 1000,
			fontSize                  : 21,	//in pixels, not MS Standard
			fontFamily                : 'Arial'
		}

		var tableContent = [	//body tables
			[{	//first row first cell
				val: '',
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth
				}
			},{	//first row second cell
				val: "Student's Name",
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				},
			},{	//first row third cell
				val: "Student's Signature",
				opts: {
					cellColWidth: tableContentSetting.thirdAndFifthColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			},{	//first row forth cell
				val: "Time In",
				opts: {
					cellColWidth: tableContentSetting.fourthAndSixthColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			},{	//first row fifth cell
				val: "Student's Signature",
				opts: {
					cellColWidth: tableContentSetting.thirdAndFifthColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			},{	//first row sixth cell
				val: "Time Out",
				opts: {
					cellColWidth: tableContentSetting.fourthAndSixthColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}],
			[{	//second row first cell
				val: '1', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//second row second cell
				val: studentNames[0] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of second row
			[{	//third row first cell
				val: '2', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//third row second cell
				val: studentNames[1] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of third row
			[{	//fourth row first cell
				val: '3', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//fourth row second cell
				val: studentNames[2] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of fourth row
			[{	//fifth row first cell
				val: '4', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//fifth row second cell
				val: studentNames[3] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of fifth row
			[{	//sixth row first cell
				val: '5', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//sixth row second cell
				val: studentNames[4] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of sixth row
			[{	//seventh row first cell
				val: '6', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//seventh row second cell
				val: studentNames[5] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of seventh row
			[{	//eighth row first cell
				val: '7', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//eighth row second cell
				val: studentNames[6] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of eigth row
			[{	//ninth row first cell
				val: '8', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//ninth row second cell
				val: studentNames[7] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of ninth row
			[{	//tenth row first cell
				val: '9', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//tenth row second cell
				val: studentNames[8] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of tenth row
			[{	//eleventh row first cell
				val: '10', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//eleventh row second cell
				val: studentNames[9] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of eleventh row
			[{	//twelveth row first cell
				val: '11', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twelveth row second cell
				val: studentNames[10] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twelveth row
			[{	//thirteenth row first cell
				val: '12', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//thirteenth row second cell
				val: studentNames[11] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of thirteenth row
			[{	//forteenth row first cell
				val: '13', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//forteenth row second cell
				val: studentNames[12] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of forteenth row
			[{	//fifteenth row first cell
				val: '14', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//fifteenth row second cell
				val: studentNames[13] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of fifteenth row
			[{	//sixteenth row first cell
				val: '15', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//sixteenth row second cell
				val: studentNames[14] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of sixteenth row
			[{	//seventeenth row first cell
				val: '16', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//seventeenth row second cell
				val: studentNames[15] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of seventeenth row
			[{	//eighteenth row first cell
				val: '17', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//eighteenth row second cell
				val: studentNames[16] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of eighteenth row
			[{	//nineteenth row first cell
				val: '18', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//nineteenth row second cell
				val: studentNames[17] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of nineteenth row
			[{	//twentyth row first cell
				val: '19', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyth row second cell
				val: studentNames[18] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyth row
			[{	//twentyfirst row first cell
				val: '20', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyfirst row second cell
				val: studentNames[19] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyfirst row
			[{	//twentySecond row first cell
				val: '21', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentySecond row second cell
				val: studentNames[20] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentySecond row
			[{	//twentyThird row first cell
				val: '22', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyThird row second cell
				val: studentNames[21] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyThird row
			[{	//twentyFourth row first cell
				val: '23', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyFourth row second cell
				val: studentNames[22] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyFourth row
			[{	//twentyFifth row first cell
				val: '24', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyFifth row second cell
				val: studentNames[23] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyFifth row
			[{	//twentySixth row first cell
				val: '25', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentySixth row second cell
				val: studentNames[24] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentySixth row
			[{	//twentySeventh row first cell
				val: '26', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentySeventh row second cell
				val: studentNames[25] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentySeventh row
			[{	//twentyEighth row first cell
				val: '27', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyEighth row second cell
				val: studentNames[26] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyEighth row
			[{	//twentyNineth row first cell
				val: '28', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//twentyNineth row second cell
				val: studentNames[27] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of twentyNineth row
			[{	//thirtyth row first cell
				val: '29', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//thirtyth row second cell
				val: studentNames[28] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', ''],	//end of thirtyth row
			[{	//thirtyfirst row first cell
				val: '30', 
				opts: {
					cellColWidth: tableContentSetting.firstColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, {	//thirtyfirst row second cell
				val: studentNames[29] || '',
				opts: {
					cellColWidth: tableContentSetting.secondColCellWidth,
					sz: tableContentSetting.fontSize,
					fontFamily: tableContentSetting.fontFamily
				}
			}, '', '', '', '']
		];	//end of thirtyfirst row

		var tableStyle = {	//body table styles
			tableAlign: "center",
			borders   : true
		};

		var configs = {
			tableContent: tableContent,
			tableStyle: tableStyle
		};
		
		return configs;
	}

	//exposing the necessary service object
	module.exports = officeGenDocxTableService;

}());
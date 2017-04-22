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

		var leftCellColWidth = 1800;
		var rightCellColWidth = 3000;
		var fontFamily = 'Arial';
		var alignment = 'right'
		var fontSize = 21;	//in pixels, and not MS standard

		var tableContent = [	//header table content
			[{	//first row first cell
				val: 'Date',
				opts: {
					cellColWidth: leftCellColWidth,	
					sz: fontSize,	
					fontFamily: fontFamily,
					align: alignment
				}
			}, {	//first row second cell
				val: '',
				opts: {
					cellColWidth: rightCellColWidth
				}
			}], 
			[{	//second row first cell
				val: 'Class', 
				opts: {
					cellColWidth: leftCellColWidth,
					sz: fontSize,
					fontFamily: fontFamily,
					align: alignment
				}
			}, {	//second row second cell
				val: '',
				opts: {
					cellColWidth: rightCellColWidth
				}
			}],	
			[{	//third row first cell
				val: 'Time Schedule',
				opts: {
					cellColWidth: leftCellColWidth,
					sz: fontSize,
					fontFamily: fontFamily,
					align: alignment
				}
			}, {	//third row second cell
				val: '',
				opts: {
					cellColWidth: rightCellColWidth
				}
			}], 
			[{	//fourth row first cell
				val: 'Instructor',
				opts: {
					cellColWidth: leftCellColWidth,
					sz: fontSize,
					fontFamily: fontFamily,
					align: alignment
				}
			}, {	//fourth row second cell
				val: '',
				opts: {
					cellColWidth: rightCellColWidth
			}
			}]];

		var tableStyle = {	//header table style
			// tableColWidth: 2500,	//commented this out so lets see if it affects the table style
			rowHeight: "1000",
			tableSize: 500,
			tableAlign: "left",
			borders: true
		};

		var configs = {
			tableContent: tableContent,
			tableStyle: tableStyle
		};

		return configs;
	}

	function signInSheetBodyTable(studentNames) {

		var firstColCellWidth = 100;
		var secondColCellWidth = 2000;
		var thirdAndFifthColCellWidth = 2300;
		var fourthAndSixthColCellWidth = 1000;
		var fontSize = 21;	//in pixels, and not MS standard sizing
		var fontFamily = 'Arial';


		var tableContent = [	//body tables
			[{	//first row first cell
				val: '',
				opts: {
					cellColWidth: firstColCellWidth
				}
			},{	//first row second cell
				val: "Student's Name",
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				},
			},{	//first row third cell
				val: "Student's Signature",
				opts: {
					cellColWidth: thirdAndFifthColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			},{	//first row forth cell
				val: "Time In",
				opts: {
					cellColWidth: fourthAndSixthColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			},{	//first row fifth cell
				val: "Student's Signature",
				opts: {
					cellColWidth: thirdAndFifthColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			},{	//first row sixth cell
				val: "Time Out",
				opts: {
					cellColWidth: fourthAndSixthColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}],
			[{	//second row first cell
				val: '1', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//second row second cell
				val: studentNames[0] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of second row
			[{	//third row first cell
				val: '2', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//third row second cell
				val: studentNames[1] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of third row
			[{	//fourth row first cell
				val: '3', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//fourth row second cell
				val: studentNames[2] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of fourth row
			[{	//fifth row first cell
				val: '4', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//fifth row second cell
				val: studentNames[3] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of fifth row
			[{	//sixth row first cell
				val: '5', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//sixth row second cell
				val: studentNames[4] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of sixth row
			[{	//seventh row first cell
				val: '6', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//seventh row second cell
				val: studentNames[5] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of seventh row
			[{	//eighth row first cell
				val: '7', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//eighth row second cell
				val: studentNames[6] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of eigth row
			[{	//ninth row first cell
				val: '8', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//ninth row second cell
				val: studentNames[7] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of ninth row
			[{	//tenth row first cell
				val: '9', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//tenth row second cell
				val: studentNames[8] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of tenth row
			[{	//eleventh row first cell
				val: '10', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//eleventh row second cell
				val: studentNames[9] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of eleventh row
			[{	//twelveth row first cell
				val: '11', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twelveth row second cell
				val: studentNames[10] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twelveth row
			[{	//thirteenth row first cell
				val: '12', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//thirteenth row second cell
				val: studentNames[11] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of thirteenth row
			[{	//forteenth row first cell
				val: '13', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//forteenth row second cell
				val: studentNames[12] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of forteenth row
			[{	//fifteenth row first cell
				val: '14', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//fifteenth row second cell
				val: studentNames[13] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of fifteenth row
			[{	//sixteenth row first cell
				val: '15', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//sixteenth row second cell
				val: studentNames[14] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of sixteenth row
			[{	//seventeenth row first cell
				val: '16', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//seventeenth row second cell
				val: studentNames[15] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of seventeenth row
			[{	//eighteenth row first cell
				val: '17', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//eighteenth row second cell
				val: studentNames[16] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of eighteenth row
			[{	//nineteenth row first cell
				val: '18', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//nineteenth row second cell
				val: studentNames[17] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of nineteenth row
			[{	//twentyth row first cell
				val: '19', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyth row second cell
				val: studentNames[18] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyth row
			[{	//twentyfirst row first cell
				val: '20', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyfirst row second cell
				val: studentNames[19] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyfirst row
			[{	//twentySecond row first cell
				val: '21', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentySecond row second cell
				val: studentNames[20] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentySecond row
			[{	//twentyThird row first cell
				val: '22', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyThird row second cell
				val: studentNames[fontSize] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyThird row
			[{	//twentyFourth row first cell
				val: '23', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyFourth row second cell
				val: studentNames[22] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyFourth row
			[{	//twentyFifth row first cell
				val: '24', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyFifth row second cell
				val: studentNames[23] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyFifth row
			[{	//twentySixth row first cell
				val: '25', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentySixth row second cell
				val: studentNames[24] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentySixth row
			[{	//twentySeventh row first cell
				val: '26', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentySeventh row second cell
				val: studentNames[25] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentySeventh row
			[{	//twentyEighth row first cell
				val: '27', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyEighth row second cell
				val: studentNames[26] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyEighth row
			[{	//twentyNineth row first cell
				val: '28', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//twentyNineth row second cell
				val: studentNames[27] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of twentyNineth row
			[{	//thirtyth row first cell
				val: '29', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//thirtyth row second cell
				val: studentNames[28] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', ''],	//end of thirtyth row
			[{	//thirtyfirst row first cell
				val: '30', 
				opts: {
					cellColWidth: firstColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, {	//thirtyfirst row second cell
				val: studentNames[29] || '',
				opts: {
					cellColWidth: secondColCellWidth,
					sz: fontSize,
					fontFamily: fontFamily
				}
			}, '', '', '', '']
		];	//end of thirtyfirst row

		var tableStyle = {	//body table styles
			tableAlign: "center",
			borders: true
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
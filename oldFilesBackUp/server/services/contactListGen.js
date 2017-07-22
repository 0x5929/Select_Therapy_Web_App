(function() {

	'use strict';

	var contactListTableService = {

		contactListBodyTable: contactListBodyTable
	};

	function contactListBodyTable(studentName) {

		var tableContentSetting = {
			firstCellColWidth : 100,
			secondCellColWidth: 2500,
			thirdCelLColWidth: 1500,
			fourthCellColWidth: 2000,
			fifthCellColWidth: 3500,
			fontFamily       : 'Arial',
			fontSize         : 21,	//in pixels, not MS Standard
			alignment        : 'center'			
		}

		var tableContent = [	//content as follows:
			[	//first row
				{
					val: '',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth
					}
				},{
					val: "Student's Name",
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: "Name preferred to be called 英文名",
					opts: {
						cellColWidth: tableContentSetting.thirdCelLColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: 'Phone Number',
					opts: {
						cellColWidth: tableContentSetting.fourthCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: 'Email',
					opts: {
						cellColWidth: tableContentSetting.fifthCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				}
			],	//end of first row
			[	//second row
				{
					val: '1',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[0] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of second row
			[	//3rd row
				{
					val: '2',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[1] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}

				},'','',''],	//end of 3rd row
			[	//4th row
				{
					val: '3',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}					
				},{
					val: studentName[2] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 4th row
			[	//5th row
				{
					val: '4',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[3] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 5th row
			[	//6th row
				{
					val: '5',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[4] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 6th row
			[	//7th row
				{
					val: '6',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[5] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 7th row
			[	//8th row
				{
					val: '7',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[6] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 8th row
			[	//9th row
				{
					val: '8',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[7] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 9th row
			[	//10th row
				{
					val: '9',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[8] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 10th row
			[	//11th row
				{
					val: '10',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[9] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 11th row
			[	//12th row
				{
					val: '11',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[10] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 12th row
			[	//13th row
				{
					val: '12',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[11] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 13th row
			[	//14th row
				{
					val: '13',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[12] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 14th row
			[	//15th row
				{
					val: '14',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[13] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 15th row
			[	//16th row
				{
					val: '15',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[14] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 16th row
			[	//17th row
				{
					val: '16',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[15] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 17th row
			[	//18th row
				{
					val: '17',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[16] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 18th row
			[	//19th row
				{
					val: '18',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[17] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 19th row
			[	//20th row
				{
					val: '19',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[18] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 20th row
			[	//21st row
				{
					val: '20',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[19] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 21st row
			[	//22nd row
				{
					val: '21',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[20] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 22nd row
			[	//23rd row
				{
					val: '22',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[21] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 23rd row
			[	//24th row
				{
					val: '23',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[22] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 24th row
			[	//25th row
				{
					val: '24',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[23] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 25th row
			[	//26th row
				{
					val: '25',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[24] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 26th row
			[	//27th row
				{
					val: '26',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[25] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 27th row
			[	//28th row
				{
					val: '27',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[26] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 28th row
			[	//29th row
				{
					val: '28',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[27] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 29th row
			[	//30th row
				{
					val: '29',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[28] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','',''],	//end of 30th row
			[	//31st row
				{
					val: '30',
					opts: {
						cellColWidth: tableContentSetting.firstCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},{
					val: studentName[29] || '',
					opts: {
						cellColWidth: tableContentSetting.secondCellColWidth,
						sz: tableContentSetting.fontSize,
						fontFamily: tableContentSetting.fontFamily
					}
				},'','','']	//end of 31st row
		];

		var tableStyle = {	//body table styles
			tableAlign: "center",
			borders   : true
		};

		var configs = {
			tableContent: tableContent,
			tableStyle  : tableStyle
		}

		return configs;
	}

	module.exports = contactListTableService;

}());
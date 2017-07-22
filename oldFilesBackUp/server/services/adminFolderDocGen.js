(function() {

	'use strict';

	function adminFolderDocService () {
		var htmlComponents = {
			header: {
				initalDocType: "<!DOCTYPE html>",
				htmlOpenTag: "<html xmlns:office='urn:schemas-microsoft-com:office:office' xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>",
				headOpenNCloseTag: "<head><xml><word:WordDocument><word:View>Print</word:View><word:Zoom>90</word:Zoom><word:DoNotOptimizeForBrowswer/></word:WordDocument></xml></head>"
			},
			body: {
				bodyOpenTag: "<body>",
				bodyContent: {
					header: {
						h1OpenTag: "<h1>",
						h1Content: "HELLO WORLD TESTING SIGNAL",
						h1CloseTag: "</h1>"
					}
				}
			},
			closer: {
				bodyCloseTag: "</body>",
				htmlCloseTag: "</html>"
			}
		}

var returnedValue = htmlComponents.header.initalDocType +
					 htmlComponents.header.htmlOpenTag +
					  htmlComponents.header.headOpenNCloseTag + 
					   htmlComponents.body.bodyOpenTag +
					    htmlComponents.body.bodyContent.header.h1OpenTag +
					     htmlComponents.body.bodyContent.header.h1Content +
					      htmlComponents.body.bodyContent.header.h1CloseTag +
					       htmlComponents.closer.bodyCloseTag +
					        htmlComponents.closer.htmlCloseTag;
return returnedValue

	}

	var service = {
		adminFolderDocService : adminFolderDocService
	};

	module.exports = service;

}());
(function() {
	'use strict';
	var configs = {
			pinVerificationHandler: pinVerificationHandler
	};

	function pinVerificationHandler(pin, signUpAs) {
		if (pin === 'sti8')	return signUpAs === 'Admin';
		if (pin === 'sti7')	return signUpAs === 'Staff';
		if (pin === 'sti6')	return signUpAs === 'Student';
		return false;
	}

	module.exports = configs;
}());
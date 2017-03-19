(function() {
	'use strict';
	var csrfTokenService = {
			csrfTokenAssignment: csrfTokenAssignment,
			invalidCsrfTokenErr: invalidCsrfTokenErr
	},
		cookieValue,
		cookieOption;

	function csrfTokenAssignment(req, res, next){
		cookieValue = req.csrfToken();
		cookieOption = { httpOnly : false, expires: new Date(Date.now() + 604800000) };	//1 week cookie
		res.cookie('XSRF-TOKEN', cookieValue, cookieOption);
		return next();
	}

	function invalidCsrfTokenErr(err, req, res, next) {
		if (err.code !== 'EBADCSRFTOKEN')	next(err);
		return res.status(403).send('Warning, forms tampered with!').end();
	}

	module.exports = csrfTokenService;

}());
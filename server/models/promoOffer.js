(function() {
	'use strict';

	//load tools
	var mongoose = require('mongoose');
	var promoOfferSchema = mongoose.Schema({
		email: String
	});
	
	module.exports = mongoose.model('promoOffer', promoOfferSchema);
}());
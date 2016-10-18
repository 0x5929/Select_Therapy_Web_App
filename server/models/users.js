(function() {
	'use strict';

	//load all tools we need
	var mongoose = require('mongoose');
	var bcrypt   = require('bcrypt-nodejs');
	var saltyRounds = 10;	//rounds of encryption to be used in generating pw hash 10 means 10 rounds of encryption, which is standard, vs 8 is the minimum 

	//define schema, note all of the following Schema will be configured into a model and exported to be further configured with db 
	var userSchema = mongoose.Schema({
			local: {
				email: String,
				password: String
			}
		});
	//created a method to generate hash for pw property in schema
	userSchema.methods.generateHash = function(password) {	//note that these functions are synchronized, maybe think about async ones?
		return bcrypt.hashSync(password, bcrypt.genSalt(saltyRounds, function(err, salt) {
			if (err) throw err;
			return salt;
		}));	
	};
	userSchema.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.local.password);
	};
	//note, the password hashing is done in passport strategy, with schema methods before saving the instance of model to be sent to the database in passportjs
	module.exports = mongoose.model('User', userSchema);
	
}());
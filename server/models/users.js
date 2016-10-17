(function() {
	'use strict';

//load all tools we need
	var mongoose = require('mongoose');
	var bcrypt   = require('bcrypt-nodejs');
//load necessary db connection with simple err checking

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', function() {	//once connection is open, runs the async function
		//defining schema for our user model: for mongoose
		var userSchema = mongoose.Schema({
			local: {
				email: String,
				password: String
			}
		});
		//created a method to generate hash for pw property in schema
		userSchema.methods.generateHash = function(password) {	//note that these functions are synchronized, maybe think about async ones?
			return bcrypt.hashSync(password, bcrypt.genSalt(10));	//created a hashed salt for the password passed in, 10 means 10 rounds of encryption, which is standard, vs 8 is the minimum 
		};
		userSchema.methods.validPassword = function(password) {
			return bcrypt.compareSync(password, this.local.password);
		};
		//note, the password hashing is done before setting the model to be sent to the database
		//so all pw hashing is taken care, and we dont have to worry about it when dealing with it within db
		module.exports = mongoose.model('User', userSchema);
	});
	
	/*
	var userSchema = mongoose.Schema({
			local: {
				email: String,
				password: String
			}
		});
		//created a method to generate hash for pw property in schema
	userSchema.methods.generateHash = function(password) {	//note that these functions are synchronized, maybe think about async ones?
		return bcrypt.hashSync(password, bcrypt.genSalt(10));	//created a hashed salt for the password passed in, 10 means 10 rounds of encryption, which is standard, vs 8 is the minimum 
	};
	userSchema.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.local.password);
	};
	//note, the password hashing is done before setting the model to be sent to the database
	//so all pw hashing is taken care, and we dont have to worry about it when dealing with it within db
	module.exports = mongoose.model('User', userSchema);
	*/
}());
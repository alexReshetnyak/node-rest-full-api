const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
	'User', 
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 0,
			maxlength: 50
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024
		},
		email: {
			type: String,
			unique: true,
			minlength: 5,
			maxlength: 255
		}
	})
);

User.validateUser = function (user) {
	const schema = {
		name: Joi.string().min(0).max(50).required(),
		password: Joi.string().min(5).max(255).required(), //* joy-password-complexity - npm for more complicated password 
		email: Joi.string().min(0).max(255)
	};

	return Joi.validate(user, schema);
};

module.exports = User;
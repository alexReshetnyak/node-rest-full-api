const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
	'Customer', 
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
		isGold: {
			type: Boolean,
			default: false
		},
		phone: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
	})
);

Customer.validateCustomer = function (customer) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		isGold: Joi.boolean(),
		phone: Joi.string().required().min(5).max(50)
	};

	return Joi.validate(customer, schema);
};

module.exports = Customer;
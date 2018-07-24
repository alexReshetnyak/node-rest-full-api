const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 0,
				maxlength: 50
			},
			isGold: {
				type: Boolean,
				default: false
			},
			phone: {
				type: String,
				required: true,
				minlength: 0,
				maxlength: 50
			}
		}),
		required: true
	},
	film: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 255
			}
		}),
		required: true
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
});

const Rental = mongoose.model(
	'Rental',
	rentalSchema
);

Rental.validateRental = function(rental) {
	const schema = {
		customerId: Joi.string().required(),
		filmId: Joi.string().required()
	};
	return Joi.validate(rental, schema);
};

module.exports = Rental;
// module.exports = rentalSchema;
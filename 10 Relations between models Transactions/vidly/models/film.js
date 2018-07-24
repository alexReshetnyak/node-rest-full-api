const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Film = mongoose.model(
	'Film', 
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255
		},
		numberInStock: {
			type: Number,
			required: true,
			min: 0,
			max: 255
		},
		genre: { // * added genre to course model
			type: genreSchema,
			required: true
		},
		dailyRentalRate: {
			type: Number,
			required: true,
			min: 0,
			max: 255
		}
	})
);

Film.validateFilm = function (film) {
	const schema = {
		title: Joi.string().min(5).max(50).required(),
		numberInStock: Joi.number(),
		genreId: Joi.string().required(),
		dailyRentalRate: Joi.number()
	};

	return Joi.validate(film, schema);
};

module.exports = Film;
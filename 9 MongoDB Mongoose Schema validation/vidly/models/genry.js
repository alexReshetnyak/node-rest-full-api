const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
	'Genre', 
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
	})
);

Genre.validateGenre = function(genre) {
	const schema = {
		name: Joi.string().min(5).required()
	};

	return Joi.validate(genre, schema);
};

module.exports = Genre;
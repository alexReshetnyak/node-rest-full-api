const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

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

router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.post('/', async (req, res) => {
	const { error } = validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		let genre = new Genre(req.body);
		genre = await genre.save();
		res.send(genre);
	} catch (error) {
		for (const field in error.errors) {
			if (error.errors.hasOwnProperty(field)) {
				console.log('Error...', error.errors[field].message);
			}
			res.status(500).send(error);
		}
	}
});

router.put('/:id', async (req, res) => {
	const { error } = validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
		if (!genre) return res.status(404).send('The genre with the given ID was not found.');
		res.send(genre);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const genre = await Genre.findByIdAndRemove(req.params.id);
		if (!genre) return res.status(404).send('The genre with the given ID was not found.');
		res.send(genre);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const genre = await Genre.findById(req.params.id);
		if (!genre) return res.status(404).send('The genre with the given ID was not found.');
		res.send(genre);
	} catch (error) {
		res.status(500).send(error);
	}
});

function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(5).required()
	};

	return Joi.validate(genre, schema);
}


module.exports = router;
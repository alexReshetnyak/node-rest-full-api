const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.post('/', async (req, res) => {

	const { error } = Genre.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const genre = new Genre(req.body);
		await genre.save();
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
	const { error } = Genre.validateGenre(req.body); 
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

module.exports = router;
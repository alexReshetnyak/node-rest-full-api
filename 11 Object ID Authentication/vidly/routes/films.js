const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');
const Film = require('../models/film');

router.get('/', async (req, res) => {
	const films = await Film.find().sort('name');
	res.send(films);
});

router.post('/', async (req, res) => {
	const { error } = Film.validateFilm(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) { return res.status(400).send('Invalid Genre Id'); }

	try {
		const film = new Film({
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate
		});
		await film.save();
		res.send(film);
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
	const { error } = Film.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const film = await Film.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
		if (!film) return res.status(404).send('The film with the given ID was not found.');
		res.send(film);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const film = await Film.findByIdAndRemove(req.params.id);
		if (!film) return res.status(404).send('The film with the given ID was not found.');
		res.send(film);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const film = await Film.findById(req.params.id);
		if (!film) return res.status(404).send('The film with the given ID was not found.');
		res.send(film);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
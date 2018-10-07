const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');
const Film = require('../models/film');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleWare = require('../middleware/async');

router.get('/', asyncMiddleWare(async (req, res) => {
	const films = await Film.find().sort('name');
	res.send(films);
}));

router.post('/', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Film.validateFilm(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) { return res.status(400).send('Invalid Genre Id'); }

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
}));

router.put('/:id', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Film.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const film = await Film.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true});
	if (!film) return res.status(404).send('The film with the given ID was not found.');
	res.send(film);
}));

router.delete('/:id', [auth, admin], asyncMiddleWare(async (req, res) => {
	const film = await Film.findByIdAndRemove(req.params.id);
	if (!film) return res.status(404).send('The film with the given ID was not found.');
	res.send(film);
}));

router.get('/:id', asyncMiddleWare(async (req, res) => {
	const film = await Film.findById(req.params.id);
	if (!film) return res.status(404).send('The film with the given ID was not found.');
	res.send(film);
}));

module.exports = router;
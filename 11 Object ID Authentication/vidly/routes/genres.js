const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

function asyncMiddleWare(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (ex) {
			next(ex);
		}
	};
}

router.get('/', asyncMiddleWare(async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
}));

router.post('/', auth, async (req, res, next) => {

	const { error } = Genre.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const genre = new Genre(req.body);
		await genre.save();
		res.send(genre);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', [auth, admin], async (req, res) => {
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
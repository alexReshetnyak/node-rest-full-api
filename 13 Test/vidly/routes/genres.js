const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleWare = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res) => {
	// throw new Error('could not get genres');
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.post('/', auth, async (req, res) => {
	const { error } = Genre.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre(req.body);
	await genre.save();
	res.send(genre);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
	const { error } = Genre.validateGenre(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
	if (!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);
	if (!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const genre = await Genre.findById(req.params.id);
	if (!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

module.exports = router;

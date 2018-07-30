const express = require('express');
const router = express.Router();
const Fawn = require('fawn'); // ! Library for make models transactions
const mongoose = require('mongoose');

const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Film = require('../models/film');
const auth = require('../middleware/auth');
const asyncMiddleWare = require('../middleware/async');

Fawn.init(mongoose); // ! Init Fawn

router.get('/', asyncMiddleWare(async (req, res) => {
	const rentals = await Rental.find().sort('-dateNow');
	res.send(rentals);
}));

router.post('/', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Rental.validateRental(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) { return res.status(400).send('No such Customer'); }

	const film = await Film.findById(req.body.filmId);
	if (!film) { return res.status(400).send('No such Film'); }

	if (film.numberInStock === 0) { return res.status(400).send('Film not in stock'); }

	const rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		film: {
			_id: film._id,
			title: film.title,
			dailyRentalRate: film.dailyRentalRate
		}
	});

	new Fawn.Task() // * Combine two actions with DB in one time  Transaction
		.save('rentals', rental) // * collection name  + model
		.update('films', { _id: film._id}, {
			$inc: { numberInStock: -1 },
			// numberInStock: 5
		})
		.run();
	
	res.send(rental);
}));

router.put('/:id', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Rental.validateRental(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const rental = await Rental.findByIdAndUpdate(
		req.params.id,
		{rentalFee: req.body.rentalFee},
		{new: true}
	);
	if (!rental) return res.status(404).send('The rental with the given ID was not found.');
	res.send(rental);
}));

router.delete('/:id', auth, asyncMiddleWare(async (req, res) => {
	const rental = await Rental.findByIdAndRemove(req.params.id);
	if (!rental) return res.status(404).send('The rental with the given ID was not found.');
	res.send(rental);
}));

router.get('/:id', asyncMiddleWare(async (req, res) => {
	const rental = await Rental.findById(req.params.id);
	if (!rental) return res.status(404).send('The rental with the given ID was not found.');
	res.send(rental);
}));

module.exports = router;
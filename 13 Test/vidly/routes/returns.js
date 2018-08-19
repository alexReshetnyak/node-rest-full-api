
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Film = require('../models/film');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/', [auth, validate(validateReturn)] , async (req, res) => {
	const customer = await Customer.findById(req.body.customerId);
	if (!customer) { return res.status(400).send('No such Customer'); }

	const film = await Film.findById(req.body.filmId);
	if (!film) { return res.status(400).send('No such Film'); }

	if (film.numberInStock === 0) { return res.status(400).send('Film not in stock'); }

	const rental = await Rental.lookup(req.body.customerId, req.body.filmId);
	if (!rental) { return res.status(400).send('Rental not found'); }
	if (rental.dateReturned) { return res.status(400).send('Return already in process'); }

	rental.return();
	await rental.save();

	await Film.update({ _id: rental.film._id }, {
		$inc: { numberInStock: 1}
	});

	res.send(rental);  
});

function validateReturn (req) {
	const schema = {
		customerId: Joi.objectId().required(),
		filmId: Joi.objectId().required()
	};

	return Joi.validate(genre, schema);
}

module.exports = router;

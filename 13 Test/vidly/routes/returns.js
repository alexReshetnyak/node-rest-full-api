
const express = require('express');
const router = express.Router();


const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Film = require('../models/film');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
	// const { error } = Rental.validateRental(req.body); 
	// if (error) { return res.status(400).send(error.details[0].message); }

	// const customer = await Customer.findById(req.body.customerId);
	// if (!customer) { return res.status(400).send('No such Customer'); }

	// const film = await Film.findById(req.body.filmId);
	// if (!film) { return res.status(400).send('No such Film'); }

	// if (film.numberInStock === 0) { return res.status(400).send('Film not in stock'); }

	// const rental = new Rental({
	// 	customer: {
	// 		_id: customer._id,
	// 		name: customer.name,
	// 		phone: customer.phone
	// 	},
	// 	film: {
	// 		_id: film._id,
	// 		title: film.title,
	// 		dailyRentalRate: film.dailyRentalRate
	// 	}
	// });

	// new Fawn.Task() // * Combine two actions with DB in one time  Transaction
	// 	.save('rentals', rental) // * collection name  + model
	// 	.update('films', { _id: film._id}, {
	// 		$inc: { numberInStock: -1 },
	// 		// numberInStock: 5
	// 	})
	// 	.run();
	
	// res.send(rental);
	res.status(401).send('Unauthorized');  
});

module.exports = router;

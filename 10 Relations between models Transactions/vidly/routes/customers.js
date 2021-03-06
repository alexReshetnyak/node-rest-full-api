const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');


router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

router.post('/', async (req, res) => {
	const { error } = Customer.validateCustomer(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		let genre = new Customer(req.body);
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
	const { error } = Customer.validateCustomer(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const customer = await Customer.findByIdAndUpdate(
			req.params.id, 
			req.body, 
			{new: true}
		);
		if (!customer) return res.status(404).send('The customer with the given ID was not found.');
		res.send(customer);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const customer = await Customer.findByIdAndRemove(req.params.id);
		if (!customer) return res.status(404).send('The customer with the given ID was not found.');
		res.send(customer);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		if (!customer) return res.status(404).send('The customer with the given ID was not found.');
		res.send(customer);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Customer = require('../models/customer');
const auth = require('../middleware/auth');
const asyncMiddleWare = require('../middleware/async');


router.get('/', asyncMiddleWare(async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
}));

router.post('/', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Customer.validateCustomer(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer(req.body);
	await customer.save();
	res.send(customer);
}));

router.put('/:id', auth, asyncMiddleWare(async (req, res) => {
	const { error } = Customer.validateCustomer(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id, 
		req.body, 
		{new: true}
	);
	if (!customer) return res.status(404).send('The customer with the given ID was not found.');
	res.send(customer);
}));

router.delete('/:id', auth, asyncMiddleWare(async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);
	if (!customer) return res.status(404).send('The customer with the given ID was not found.');
	res.send(customer);
}));

router.get('/:id', asyncMiddleWare(async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer) return res.status(404).send('The customer with the given ID was not found.');
	res.send(customer);
}));

module.exports = router;
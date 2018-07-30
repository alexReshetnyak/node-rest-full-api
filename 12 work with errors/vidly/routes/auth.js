const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt'); // * for hash password
const Joi = require('joi');

const User = require('../models/user');
const asyncMiddleWare = require('../middleware/async');

router.get('/', asyncMiddleWare(async (req, res) => {
	const users = await User.find().sort('name');
	res.send(users);
}));

router.post('/', asyncMiddleWare(async (req, res) => {
	const { error } = validate(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	let user = await User.findOne({email: req.body.email});
	if (!user) { return res.status(400).send('invalid email or password'); }

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) { return res.status(400).send('invalid email or password'); }

	const token = user.generateAuthToken();
	res.send({ token });
}));

function validate(req) {
	const schema = {
		password: Joi.string().min(5).max(255).required(),
		email: Joi.string().min(0).max(255)
	};

	return Joi.validate(req, schema);
}

module.exports = router;
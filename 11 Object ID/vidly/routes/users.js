const express = require('express');
const router = express.Router();
const _ = require('lodash');

const User = require('../models/user');


router.get('/', async (req, res) => {
	const users = await User.find().sort('name');
	res.send(users);
});

router.post('/', async (req, res) => {
	const { error } = User.validateUser(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	try {
		let user = await User.findOne({email: req.body.email});
		if (user) { return res.status(400).send('User already registered'); }

		// user = new User({
		// 	name: req.body.name,
		// 	email: req.body.email,
		// 	password: req.body.password
		// });

		user = new User(_.pick(req.body, ['name', 'email', 'password']));
		await user.save();

		user = _.pick(user, ['_id', 'name', 'email']);
		res.send(user);
		// res.send({
		// 	name: user.name,
		// 	email: user.email
		// });
	} catch (error) {
		for (const field in error.errors) {
			if (error.errors.hasOwnProperty(field)) {
				console.log('Error...', error.errors[field].message);
			}
			res.status(500).send(error);
		}
	}
});

module.exports = router;
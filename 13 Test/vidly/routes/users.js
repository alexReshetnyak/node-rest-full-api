const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt'); // * for hash password

const User = require('../models/user');
const auth = require('../middleware/auth');
const asyncMiddleWare = require('../middleware/async');


router.get('/', asyncMiddleWare(async (req, res) => {
	const users = await User.find().sort('name');
	res.send(users);
}));

router.get('/me', auth, asyncMiddleWare(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password'); //* exclude password
	res.send({data: user});
}));

router.post('/', asyncMiddleWare(async (req, res) => {
	const { error } = User.validateUser(req.body); 
	if (error) { return res.status(400).send(error.details[0].message); }

	let user = await User.findOne({ email: req.body.email });
	if (user) { return res.status(400).send('User already registered'); }

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	
	await user.save();

	const token = user.generateAuthToken();
	user = _.pick(user, ['_id', 'name', 'email']);

	res.header('x-auth-token', token).send(user); // add auth token to header
}));

module.exports = router;
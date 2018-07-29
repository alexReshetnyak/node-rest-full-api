// ! to set jwtPrivateKey use this command - export vidly_jwtPrivateKey=password

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // * package for validate Object Id

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const films = require('./routes/films');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: JwtPrivateKey is not defined');
	process.exit(1); // ! exit from process, 0 - success, 1 or something else - fail 
}


mongoose.connect(config.get('dbPath'))  // * connect to DB
	.then(() => console.log('Connected to mongoDB...'))
	.catch(err => console.log('Problem with connect to MongoDb...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/films', films);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
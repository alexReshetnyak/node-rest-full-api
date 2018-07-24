
const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); 

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const films = require('./routes/films');
const rentals = require('./routes/rentals');

const app = express();

mongoose.connect(config.get('dbPath'))  // * connect to DB
	.then(() => console.log('Connected to mongoDB...'))
	.catch(err => console.log('Problem with connect to MongoDb...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/films', films);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
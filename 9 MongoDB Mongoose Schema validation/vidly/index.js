
const genres = require('./routes/genres');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); 
const app = express();

mongoose.connect(config.get('dbPath'))  // * connect to DB
	.then(() => console.log('Connected to mongoDB...'))
	.catch(err => console.log('Problem with connect to MongoDb...', err));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
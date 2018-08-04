const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = function() {
	mongoose.connect(config.get('dbPath'))  // * connect to DB
		.then(() => winston.info('Connected to mongoDB...'));
};

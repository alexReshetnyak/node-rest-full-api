const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = function() {
	const dbPath =config.get('dbPath');
	mongoose.connect(dbPath)// * connect to DB
		.then(() => winston.info(`Connected to ${dbPath}...`));
};

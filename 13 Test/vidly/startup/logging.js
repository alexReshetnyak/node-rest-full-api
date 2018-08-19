
const winston = require('winston'); // * lib Logger send messages to console, file or http
require('winston-mongodb');
require('express-async-errors'); // * package instead asyncMiddleWare 

module.exports = function () {

	const logger = winston.createLogger({
		level: 'info',
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.prettyPrint(),
			winston.format.colorize()
		),
		transports: [
			new winston.transports.Console({level: 'info'})
		]
	});


	process.on('uncaughtException', (ex) => { // * catch sync errors
		winston.error(ex.message, ex);
		logger.error(ex.message, ex);
		console.log(ex.message);
		
		process.exit(1);
	});

	process.on('unhandledRejection', (ex) => { // * catch async errors
		logger.error(ex.message, ex);
		winston.error(ex.message, ex);

		console.log(ex.message);
		process.exit(1);
	});

	winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
		winston.format.prettyPrint()
	);

	winston.add(
		new winston.transports.File({filename: 'logfile.log', level: 'info'})
	); // * save logs to file

	winston.add( //* Save log to mongoDB
		new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', level: 'error'})
	);

	winston.add( //* Log in console
		new winston.transports.Console({level: 'info'})
	);
};

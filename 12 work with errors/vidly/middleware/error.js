
const winston = require('winston');

module.exports = function (err, req, res, next) { // * handle errors inside express
	//* log levels: 
	//* error
	//* warn
	//* info
	//* verbose
	//* debug
	//* silly

	winston.log('error', err.message, err); // *  or   winston.error(err.message, err)
 
	res.status(500).send('Something went wrong');
};

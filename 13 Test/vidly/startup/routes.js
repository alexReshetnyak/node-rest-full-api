
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const films = require('../routes/films');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errorMiddleware = require('../middleware/error');

module.exports = function(app, express) {
	app.use(express.json());
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/films', films);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);

	app.use(errorMiddleware);
};


module.exports = function (err, req, res, next) { // * handle errors
	res.status(500).send('Something went wrong');
};

const Joi = require('joi');

module.exports = function () {
	Joi.objectId = require('joi-objectid')(Joi); // * package for validate Object Id
};

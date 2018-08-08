// ! to set jwtPrivateKey use this command - export vidly_jwtPrivateKey=password
const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')(); // start winston
require('./startup/database')(); // start connection to mongoDb
require('./startup/routes')(app, express); // use routes
require('./startup/config')(); // use config options
require('./startup/validation')(); // use joi validation


// throw new Error('some err');

const p = Promise.reject(new Error('Async Error happened'));
p.then(() => console.log('Done'));

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
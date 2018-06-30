
// ! node inspect to start debug
// ! To set env open terminal and enter export NODE_ENV=production
// ! To set hidden property use terminal command - export app_password=1234
// ! To set debugger environment enter in terminal - export DEBUG=app:startup, or export DEBUG=   to reset env, or export DEBUG=app:startup,app:db  - to set multiple env, or DEBUG=app:* - to see all env

const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup'); // ! Set Debug namespace, to on it enter in terminal - export DEBUG=app:startup
const dbDebugger = require('debug')('app:bb'); // ! Set Debug namespace
const carsRouter = require('./routes/cars'); // ! Import Cars router module
const homeRouter = require('./routes/home'); // ! Import home router module

app.set('view engine', 'pug'); // ! Set template engine to generate html pages
app.set('views', './views'); // ! Set route to views files

app.use(express.json()); // ! Middleware function to parse JSON
app.use(express.urlencoded({ extended: true })); // ! Middleware function to parse encoding data from form
app.use(express.static('public')); // ! send any data from folder public || For example open localhost:3000/readme.txt
app.use(helmet()); // ! Middleware to secure api from bad headers

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // ! Middleware to monitor in terminal any request (time and so on...)
  // ! To set env open terminal and enter export NODE_ENV=production
  // startupDebugger('Morgan enabled'); // ! Instead console.log we can use our own logger
}

app.use('/', homeRouter); // ! Use home router module
app.use('/api/cars', carsRouter); // ! Use cars router module

// PORT
const port = process.env.PORT || 3000; // Get current available PORT
app.listen(port, () => console.log(`server start on port ${port}...`))





// console.log(`NODE_ENV: ${ process.env.NODE_ENV }`); // ! Get current env
// console.log(`env: ${app.get('env')}`); // ! Get current env (dev by default)
// console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`); // ! Get property from config file
// console.log(`Password: ${config.get('mail.password')}`); // ! get hide property , To set hidden property use terminal command - export app_password=1234

// Some DB logic 
// dbDebugger('connected to DB...');
//

// app.use(logger); // ! Middleware function 
// app.use((req, res, next) => { // ! Middleware function
//   console.log('Authenticating..');
//   next();
// });
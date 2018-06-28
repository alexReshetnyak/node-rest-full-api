
// ! node inspect to start debug
// ! To set env open terminal and enter export NODE_ENV=production
// ! To set hidden property use terminal command - export app_password=1234
// ! To set debugger environment enter in terminal - export DEBUG=app:startup, or export DEBUG=   to reset env, or export DEBUG=app:startup,app:db  - to set multiple env, or DEBUG=app:* - to see all env

const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup'); // ! Set Debug namespace, to on it enter in terminal - export DEBUG=app:startup
const dbDebugger = require('debug')('app:bb'); // ! Set Debug namespace

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

const cars = [
  {id: 1, brand: 'daewoo'},
  {id: 2, brand: 'subaru'},
  {id: 3, brand: 'honda' }
];

app.get('/', (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello'}); // sent view to front
});

app.get('/api/cars', (req, res) => {
  res.send(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  if (!car) { return res.status(404).send('car not found')};
  res.send(car);
});


app.post('/api/cars', (req, res) => {

  const { error } = validateCar(req.body);
  if (error) {
    // ! 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  const car = {
    id: cars.length + 1,
    brand: req.body.brand
  };

  cars.push(car);
  res.send(car);
});

app.put('/api/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id);
  // ! 404 Not found
  if (!car) { return res.status(404).send('car not found')};

  const { error } = validateCar(req.body);

  if (error) {
    // ! 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  car.brand = req.body.brand;
  res.send(car);
});


app.delete('/api/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id);
  // ! 404 Not found
  if (!car) { return res.status(404).send('car not found')};

  const index = cars.indexOf(car);
  cars.splice(index, 1);

  res.send(car);
});

// PORT
const port = process.env.PORT || 3000; // Get current available PORT
app.listen(port, () => console.log(`server start on port ${port}...`))



function validateCar(car) {
  const schema = { // ! Use Joi for validation
    brand: Joi.string().min(3).required()
  };
  return Joi.validate(car, schema);
}

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
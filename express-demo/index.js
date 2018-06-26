
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const cars = [
  {id: 1, brand: 'daewoo'},
  {id: 2, brand: 'subaru'},
  {id: 3, brand: 'honda' }
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/cars', (req, res) => {
  res.send(cars);
});

// app.get('/api/cars/:id/:year', (req, res) => {
//   res.send(Object.assign({},req.params, req.query));
// });

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
app.listen(port, () => console.log(`server start on port ${port}...`));




function validateCar(car) {
  const schema = { // ! Use Joi for validation
    brand: Joi.string().min(3).required()
  };
  return Joi.validate(car, schema);
}
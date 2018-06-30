
const express = require('express');
const router = express.Router(); // ! Create router

const cars = [
  {id: 1, brand: 'daewoo'},
  {id: 2, brand: 'subaru'},
  {id: 3, brand: 'honda' }
];


router.get('/', (req, res) => {
  res.send(cars);
});

router.get('/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  if (!car) { return res.status(404).send('car not found')};
  res.send(car);
});


router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id);
  // ! 404 Not found
  if (!car) { return res.status(404).send('car not found')};

  const index = cars.indexOf(car);
  cars.splice(index, 1);

  res.send(car);
});

function validateCar(car) {
  const schema = { // ! Use Joi for validation
    brand: Joi.string().min(3).required()
  };
  return Joi.validate(car, schema);
}

module.exports = router;
// ! Install MongoDB on Linux
// ! 1) Create folder for DB "data/db" using sudo mkdir -p /data/db
// ! 2) Change access right using sudo chown yourUbuntuProfileName /data/db  (current name - alex) or sudo chown -R `id -un` /data/db
// ! 3) Run MongoDB using command mongod
// ! 4) Install MongoDB compass

// ! Export data to MongoDB    mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

const mongoose = require('mongoose');
const config = require('config'); // Add Config module
// console.log('config: ', config.get('dbPath'));

mongoose.connect(config.get('dbPath'))  // * connect to DB
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.log('Problem with connect to MongoDb...', err));

const carSchema = new mongoose.Schema({
  brand: { 
    type: String, 
    required: true,
    minlength: 3,
    maxlength: 255,
   // match: /patern/ // * use pattern to validate specific value
  }, // ! Types : String, Number, Date, Buffer, Boolean, ObjectID, Array
  model: {
    type: String,
    required: true,
    enum: ['2106', 'sens', 'lacceti'] // * value shuld be equal on of this values
  },
//  colors: [ String ], // * few types 
  colors: { // * custom validator
    type: Array,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Car should have at least 1 color'
    }
  }, 
  date: { type: Date, default: Date.now },
  isSold: Boolean,
  price: {
    type: Number,
    required: function() { return !this.isSold }, // * required if isSold === false
    min: 10,
    max: 1000000
  }
});

const Car = mongoose.model('Car', carSchema); // * Create Car model from Schema

//---------------------------------------------POST-------------------------------------------------
async function createCar() {
  const car = new Car({
    brand: 'VAZ',
    model: '2106',
    colors: [],
    isSold: false,
    price: 6000
  });

  try {
    // car.validate(); // * To manualy check valid

    const result = await car.save();
    console.log(result, 'result');
  } catch (error) {
    console.log(error.message);
  }
}
  // createCar();

//-----------------------------------------GET----------------------------------------
async function getCars() {
  // ! eq (equal)
  // ! ne (not equal)
  // ! gt (greater than)
  // ! gte (greater than or equal to)
  // ! lt (Less than)
  // ! lte (less than or equal to)
  // ! in
  // ! nin (not in)
  // ! or
  // ! and
  const pageNumber = 1;
  const pageSize = 10;

  const cars = await Car

    // .find({brand: 'Chevrolet', isSold: false})
    // .find({price: {$gt: 10, $lte: 20}}) // find all with price > 10 && price <= 20
    // .find({price: {$gt: 10, $lte: 20}}) // find all with price > 10 && price <= 20

    // .find()
    // .or( [{brand: 'Daewoo'}, {model: 'Lacetti'}] ) // find item that have brand 'Daewoo' or model 'Lacetti' Use with .find()
    // .and( [{model: 'Sens'}, {isSold: false}] ) // find item that have two this parameters Use with .find()
   
    .find({model: /^Sen/ }) // * Use regular expression
    .find({model: /s$/i})
    .find({model: /.*en.*/i}) // * find by match peace of word (match)
   
    .skip((pageNumber - 1) * pageSize) // * Use for pagination, pass offset
    .limit(pageSize)
   
    .sort({brand: 1}) // * sort by brand , also cat use -1 to opposite order sort
    .select({brand: 1, colors: 1}); // * Return only brand and colors
    // .count(); // * count number of elements
  console.log("Cars: ", cars);
}
// getCars();

//---------------------------------------PUT------------------------------------

async function updateCourse(id) { // First Approach
  const car = await Car.findById(id);
  if (!car) return;

  // car.isSold = true; 
  // car.model = 'sport';
  // or bellow
  car.set({
    isSold: true,
    model: 'sport'
  });
  
  try {
    const result = await car.save();
    console.log(result, 'result');
  } catch (error) {
    console.log(error.message); 
  }
  
}

// updateCourse('5b38de481a117c12a8634fb3');

async function updateCourse2(id) { // Second Approach
  try {
    //  const result = await Car.update({_id: id}, {
    const car = await Car.findByIdAndUpdate(id, {
      $set: {
        brand: 'Subaru',
        isSold: true
      }
    }, { new: true }); // {new: true} - return updated item
    console.log(car, 'result');

  } catch (error) {
    console.log(error.message)
  }
}

// updateCourse2('5b38de481a117c12a8634fb3');


// ----------------------------DELETE-------------------------------

async function removeCar(id) { // Second Approach
  // const result = await Car.deleteOne({_id: id});
  const car = await Car.findByIdAndRemove(id);
  console.log(car, 'result');
}
 
 // removeCar('5b38de481a117c12a8634fb3');
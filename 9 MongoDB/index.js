// ! Install MongoDB on Linux
// ! 1) Create folder for DB "data/db" using sudo mkdir -p /data/db
// ! 2) Change access right using sudo chown yourUbuntuProfileName /data/db  (current name - alex) or sudo chown -R `id -un` /data/db
// ! 3) Run MongoDB using command mongod
// ! 4) Install MongoDB compass

const mongoose = require('mongoose');
const config = require('config'); // Add Config module
// console.log('config: ', config.get('dbPath'));

mongoose.connect(config.get('dbPath'))  // ! connect to DB
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.log('Problem with connect to MongoDb...', err));
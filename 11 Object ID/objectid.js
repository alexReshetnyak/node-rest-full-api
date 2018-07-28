
const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId(); // generate new Id

id.getTimestamp(); // *  Get create time (ISO string)
const isValid = mongoose.Types.ObjectId.isValid('1234'); // Return false
 
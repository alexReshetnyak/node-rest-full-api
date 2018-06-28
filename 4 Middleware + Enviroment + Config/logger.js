
function log (req, res, next) {  // ! Middleware function
  console.log('Logging..');
  next();
}

module.exports = log;
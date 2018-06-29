
const express = require('express');
const router = express.Router(); // ! Create router

router.get('/', (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello'}); // sent view to front
});

module.exports = router;
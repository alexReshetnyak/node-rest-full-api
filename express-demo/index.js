
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/cars', (req, res) => {
  res.send(['car1', 'car2', 'car3']);
});

// PORT
const port = process.env.PORT || 3000; // Get current available PORT

app.listen(port, () => console.log(`server start on port ${port}...`));
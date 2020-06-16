require('dotenv').config();
const express = require('express');
const api = require('./routes');

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

require('dotenv').config();
const express = require('express');
const api = require('./routes');

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', api);

app.get('/', (request, response) => {
  response.json({message: 'Bienvenue sur Express'} );
});

module.exports = app; 

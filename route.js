const connection = require('./conf');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});


app.get('/', (request, response) => {
    response.send('Bienvenue sur Express');
});
  
app.get('/users', (req, res) => {
    connection.query('SELECT * from DVM_Legal_Entity', (err, results) =>{
        if(err) {
            res.status(500).send('No body was here..')
        } else {
            res.json(results);
        }
    })
});
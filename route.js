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

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from DVM_Legal_Entity WHERE id = ?', id, (err, results) => {
    if(err) {
      res.status(500).send('Nobody was here..')
    } else {
      res.json(results);
    }
  })
})

app.post('/users', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO DVM_Legal_Entity SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un DVM");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/users/:id', (req, res) => {
  const idDVM = req.params.id;
  const formData = req.body;
  connection.query('UPDATE DVM_Legal_Entity SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un DVM");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const idDVM = req.params.id;
  connection.query('DELETE FROM DVM_Legal_Entity WHERE id = ?', [idDVM], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un DVM");
    } else {
      res.sendStatus(200);
    }
  });
});

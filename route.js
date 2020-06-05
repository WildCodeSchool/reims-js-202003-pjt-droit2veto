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
      return (
        res.status(500).send('No body was here..')
      )
    }
    res.json(results);
  })
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from DVM_Legal_Entity WHERE id = ?', id, (err, results) => {
    if(err) {
      return (
        res.status(500).send('Internal server error')
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).send('User ID not found')
      )
    }
    res.json(results)
  })
})

app.post('/users', (req, res) => {
  const formData = req.body;
  if (formData.ordinal_number === null || formData.lastname === null){
    return (
      res.status(400).send("Necessary fields empty")
    )
  }
  connection.query('INSERT INTO DVM_Legal_Entity SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).send("Erreur lors de la sauvegarde d'un DVM")
      )
    }
    res.status(201).json({...formData, id : results.insertId})
  });
});

app.put('/users/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  connection.query('UPDATE DVM_Legal_Entity SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
    if (err) {
      return (
        res.status(500).send("Error server")
      )
    }
    if (results.changedRows === 0) {
      return (
        res.status(404).send('User ID not found')
      )
    }
    res.status(200).send(`Changed row ${results.changedRows}`);
  });

});

app.delete('/users/:id', (req, res) => {
  const idDVM = req.params.id;

  connection.query('DELETE FROM DVM_Legal_Entity WHERE id = ?', [idDVM], err => {
    if (err) {
      return (
        res.status(500).send("Erreur lors de la suppression d'un DVM")
      )
    } else {
      res.sendStatus(200);
    }
  });
});

require('dotenv').config();
const connection = require('./conf');
const express = require('express');
const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({message: 'Bienvenue sur Express'} );
});

// route DVM
app.get('/users', (req, res) => {
  connection.query('SELECT * from DVM_Legal_Entity', (err, results) => {
    if (err) {
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
    if (err) {
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
  if (formData.ordinal_number === null || formData.lastname === null) {
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
    res.status(201).json({ ...formData, id: results.insertId })
  });
});

app.put('/users/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  if (isNaN(idDVM)) {
    return (
      res.status(400).send("No correct ID")
    )
  }
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
        res.status(500).send("Internal server error")
      )
    } else {
      res.sendStatus(200);
    }
  });
});

// Activities 

app.get('/activities', (req, res) => {
  connection.query('SELECT * from Activities', (err, results) => {
    if (err) {
      return (
        res.status(500).send('there are no activities...')
      )
    }
    res.json(results);
  })
});

app.get('/activities/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from Activities WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).send('Internal server error')
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).send('Activities ID not found')
      )
    }
    res.json(results)
  })
})

app.put('/activities/:id', (req, res) => {
  const idActivity = req.params.id;
  const formData = req.body;
  if (isNaN(idActivity)) {
    return (
      res.status(400).send("No correct ID")
    )
  }
  connection.query('UPDATE Activities SET ? WHERE id = ?', [formData, idActivity], (err, results) => {
    if (err) {
      return (
        res.status(500).send("Internal server error")
      )
    } 
    if (results.changedRows === 0) {
      return (
        res.status(404).send('User ID not found')
      )
    }
    res.status(200).send(`Changed row ${results.changedRows}`);
  })
});

app.post('/activities', (req, res) => {
  const formData = req.body;
  if (formData.title === null) {
    return (
      res.status(400).send("Necessary fields empty")
    )
  }
  connection.query('INSERT INTO Activities SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).send("Internal server error")
      )
    } else {
      return (
        res.status(201).json({ ...formData, id: results.insertId })
      )
    }
  });
});



app.delete('/activities/:id', (req, res) => {
  const idActivities = req.params.id

  connection.query('DELETE FROM Activities WHERE id = ?', [idActivities], err => {
    if (err) {
      return (
        res.status(500).send("Internal server error")
      )
      } else {
        res.sendStatus(200);
      }  
  });
});


// PurchasesOrders

app.get('/purchasesorders', (req, res) => {
  connection.query('SELECT * from PurchasesOrders', (err, results) => {
    if (err) {
      return (
        res.status(500).send('there are no purchasesorders...')
      )
    }
    res.json(results);
  })
});

app.get('/purchasesorders/:id', (req, res) => {
  connection.query('SELECT * from PurchasesOrders WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).send('Internal server error')
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).send('PurchasesOrders ID not found')
      )
    }
    res.json(results)
  })
});

app.post('/purchasesorders', (req, res) => {
  const formData = req.body;
  if (formData.title === null) {
    return (
      res.status(400).send("Necessary fields empty")
    )
  }
  connection.query('INSERT INTO PurchasesOrder SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).send("Internal server error")
      )
    }else{
      return (
        res.status(201).json({ ...formData, id: results.insertId })
      )
    }
  });
});

module.exports = app; 
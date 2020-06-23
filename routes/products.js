const connection = require('./conf');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true 
}));

products.delete('/products/:id', (req, res) => {
  const idProducts = req.params.id

  connection.query('DELETE FROM Products WHERE id = ?', [idProducts], err => {
    if (err) {
      return (
        res.status(500).send("Internal server error")
      )
    } else {
      res.sendStatus(200);
    }
  });
});

products.put('/products/:id', (req, res) => {

  const idProducts = req.params.id;
  const formData = req.body;

  if (isNaN(idProducts)) {
    return (
      res.status(400).send("No correct ID")
    )
  }
  connection.query('UPDATE products SET ? WHERE id = ?', [formData, idProducts], (err, results) => {
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

products.post('/products', (req, res) => {
  const formData = req.body;
  if (formData.title === null) {
    return (
      res.status(400).send("Necessary fields empty")
    )
  }
  connection.query('INSERT INTO Products SET ?', formData, (err, results) => {
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

products.get('/products/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from products WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).send('Internal server error')
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).send('products ID not found')
      )
    }
    res.json(results)
  })
})

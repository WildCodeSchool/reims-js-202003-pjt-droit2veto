const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  connection.query('SELECT * from PurchasesOrders', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'There are no purchasesorders...' })
      )
    }
    res.json(results);
  })
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)){
    return (
      res.status(400).json({ message: "No correct ID" })
    )
  }
  connection.query('SELECT * from PurchasesOrders WHERE id = ?', id, (err, results) => {

    if (err) {
      return (
        res.status(500).json({ message: 'Internal server error' })
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({ message: 'PurchasesOrders ID not found' })
      )
    }
    res.json(results)
  })
});

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.DVM_id === "" || formData.quantity === ""|| formData.DVM_id == null|| formData.quantity == null ) {
    return (
      res.status(400).json({ message: "Necessary fields are empty" })
    )
  }
  connection.query('INSERT INTO PurchasesOrders SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: "Internal server error" })
      )
    } else {
      return (
        res.status(201).json({ ...formData, id: results.insertId })
      )
    }
  });
});

module.exports = router;

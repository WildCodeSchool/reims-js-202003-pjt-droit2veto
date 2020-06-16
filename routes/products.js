const connection = require('../conf');
const express = require('express');
const router = express.Router();

router.delete('/:id', (req, res) => {
  const idProducts = req.params.id

  connection.query('DELETE FROM Products WHERE id = ?', [idProducts], err => {
    if (err) {
      return (
        res.status(500).json({message: "Internal server error"})
      )
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/:id', (req, res) => {

  const idProducts = req.params.id;
  const formData = req.body;

  if (isNaN(idProducts)) {
    return (
      res.status(400).json({message:"No correct ID"})
    )
  }
  connection.query('UPDATE Products SET ? WHERE id = ?', [formData, idProducts], (err, results) => {
    if (err) {
      return (
        res.status(500).json({message:"Error server"})
      )
    }
    if (results.changedRows === 0) {
      return (
        res.status(404).json({message:'User ID not found'})
      )
    }
    res.status(200).json({message:`Changed row ${results.changedRows}`});
  });

});

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.title === null) {
    return (
      res.status(400).json({message:"Necessary fields empty"})
    )
  }
  connection.query('INSERT INTO Products SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message:"Internal server error"})
      )
    } else {
      return (
        res.status(201).json({ ...formData, id: results.insertId })
      )
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from Products WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message:'Internal server error'})
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({message:'products ID not found'})
      )
    }
    res.json(results)
  })
})

router.get('/', (req, res) => {
  connection.query('SELECT * from Products' , (err, results) => {
    if (err) {
      return (
        res.status(500).json({message:'Internal server error'})
      )
    }
    res.json(results)
  })
})

module.exports = router;
const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  connection.query('SELECT * from DVM_Legal_Entity', (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: 'No body was here..'})
      )
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  if (isNaN(id)) {
    return (
      res.status(404).json({message: "No correct ID"})
    )
  }
  connection.query('SELECT * from DVM_Legal_Entity WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: 'Internal server error'})
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({message: 'User ID not found'})
      )
    }
    res.json(results)
  });
});

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.ordinal_number == null || formData.lastname == null) {
    return (
      res.status(400).json({message: "Necessary fields are empty"})
    )
  }
  connection.query('INSERT INTO DVM_Legal_Entity SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Erreur lors de la sauvegarde d'un DVM"})
      )
    }
    res.status(201).json({ ...formData, id: results.insertId })
  });
});

router.put('/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  if (isNaN(idDVM)) {
    return (
      res.status(400).json({message: "No correct ID"})
    )
  }
  connection.query('UPDATE DVM_Legal_Entity SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Error server"})
      )
    }
    if (results.changedRows === 0) {
      return (
        res.status(404).json({message: 'User ID not found'})
      )
    }
    res.status(200).json({message: `Changed row ${results.changedRows}`});
  });
});

router.delete('/:id', (req, res) => {
  const idDVM = req.params.id;

  connection.query('DELETE FROM DVM_Legal_Entity WHERE id = ?', [idDVM], err => {
    if (err) {
      return (
        res.status(500).json({message: "Internal server error"})
      )
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;

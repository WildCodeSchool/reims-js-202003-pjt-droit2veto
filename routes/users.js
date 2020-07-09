const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  connection.query('SELECT * from DVM_Legal_Entity', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'No body was here..' })
      )
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from DVM_Legal_Entity WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Internal server error' })
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({ message: 'User ID not found' })
      )
    }
    delete results[0].password
    res.json(results[0])
  });
});

router.post('/', (req, res) => {
  let createdMail = 0
  const formData = req.body;
  
  if (formData.ordinal_number == null || formData.email == null || formData.password == null) {
    return (
      res.status(400).json({ message: "Necessary fields are empty" })
    );
  }

  connection.query('SELECT * from DVM_Legal_Entity', (errAll, resultsAll) => {

    if (errAll) {
      return (
        res.status(500)
      )
    }

    resultsAll.map((user) => {
      if (user.email === formData.email) {
        return createdMail = 1
      }
    })

    if (createdMail === 0) {
      bcrypt.hash(formData.password, 10, function (err, hash) {
        formData.password = hash;
        if (res) {
          connection.query('INSERT INTO DVM_Legal_Entity SET ?', formData, (errInsert, results) => {
            if (errInsert) {
              return (
                res.status(500).json({ ...formData })
              );
            }
            delete formData.password
            return res.status(201).json({ ...formData, id: results.insertId });
          });
        } else {
          res.status(500).json({ message: "pass no hash" });
        }
      })
    } else {
      return res.status(400).json({ message: "user already exist" })
    }
  })
})



router.put('/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  connection.query('UPDATE DVM_Legal_Entity SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: "Error server" })
      )
    }
    if (results.changedRows === 0) {
      return (
        res.status(404).json({ message: 'User ID not found' })
      )
    }
    res.status(200).json({ message: `Changed row ${results.changedRows}` });
  });
});

router.delete('/:id', (req, res) => {
  const idDVM = req.params.id;

  connection.query('DELETE FROM DVM_Legal_Entity WHERE id = ?', [idDVM], err => {
    if (err) {
      return (
        res.status(500).json({ message: "Internal server error" })
      )
    } else {
      res.sendStatus(200);
    }
  });
});

/*******************************************/

router.get('/:userId/activities', (req, res) => {
  const userId = req.params.userId;
  connection.query('SELECT * FROM Activities a JOIN DVM_Activities da ON a.id=da.Activities_id WHERE DVM_id = ?', userId, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});

router.post('/:userId/activities', (req, res) => {
  formData = req.body;
  connection.query('INSERT INTO DVM_Activities SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});

router.delete('/:userId/activities/:activityId', (req, res) => {
  const { userId, activityId } = req. params;
  connection.query('DELETE FROM DVM_Activities WHERE DVM_id = ? AND Activities_id = ?',  [userId, activityId], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});


module.exports = router;

const express = require('express');
const connection = require('../conf');
const router = express.Router();

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


module.exports = router;
const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    connection.query('SELECT * from Activities_Products', (err, results) => {
      if (err) {
        return (
          res.status(500).json({message: 'Error server'})
        )
      }
      res.json(results);
    });
  });

module.exports = router;
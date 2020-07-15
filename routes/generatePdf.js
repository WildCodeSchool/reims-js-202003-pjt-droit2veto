const express = require('express');
const connection = require('../conf');
const router = express.Router();
const pdfTemplate = require('../documents/pdf');
const pdf = require('html-pdf'); 

router.post('/:userId/activities', (req, res) => {
  const userId = req.params.userId;
  connection.query('SELECT * FROM Activities a JOIN DVM_Activities da ON a.id=da.Activities_id WHERE DVM_id = ?', userId, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    results = JSON.stringify(results);
    pdf.create(pdfTemplate(results), {}).toFile(`${__dirname}/result.pdf`, (err) => {
      console.log(results)
      if(err) {
        return res.sendStatus(500)
      }
      return res.sendStatus(200)
    });
  });
});

router.get('/:userId/pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
});

module.exports = router;
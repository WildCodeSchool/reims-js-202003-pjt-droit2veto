const express = require('express');
const connection = require('../conf');
const router = express.Router();
const pdfTemplate = require('../documents/pdf');
const pdf = require('html-pdf'); 

router.post('/:userId/activities', (req, res) => {
  const { userId } = req.params;
  connection.query('SELECT * FROM Activities a JOIN DVM_Activities da ON a.id=da.Activities_id WHERE DVM_id = ?', userId, (err, activities) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
  connection.query('SELECT * FROM DVM_Legal_Entity WHERE id = ?', userId, (err, users) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    pdf.create(pdfTemplate(activities, users[0]), {}).toFile(`${__dirname}/result.pdf`, (err) => {
      if(err) {
        return res.sendStatus(500)
      }
      return res.sendStatus(200)
    });
  })});
});

router.get('/:userId/pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
});

module.exports = router;
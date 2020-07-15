const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');
const connection = require('../conf');

router.post('/:id', upload.single('monfichier'), (req, res, next) => {

  const today = Date.now();
  const { id } = req.params

  const searchTerm = '.';
  const originalName = req.file.originalname
  const extensionName = originalName.slice(originalName.indexOf(searchTerm, (originalName.length - 4)));
  const fileName = `${id}-${today}${extensionName}`

  const formData = { logo: `/images/${fileName}`}

  fs.rename(req.file.path, 'public/images/' + fileName , (err) => {
    if (err) {
        res.send('problème durant le déplacement');
    } else {
        res.send('Fichier uploadé avec succès');
    }
  });
  
  connection.query('UPDATE DVM_Legal_Entity SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: "Error server" })
      )
    }
  });
})

module.exports = router;

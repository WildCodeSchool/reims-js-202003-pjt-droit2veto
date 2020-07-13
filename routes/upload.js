const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

router.post('/', upload.single('monfichier'), (req, res, next) => {
  fs.rename(req.file.path, 'public/images/' + req.file.originalname, (err) => {
    if (err) {
        res.send('problème durant le déplacement');
    } else {
        res.send('Fichier uploadé avec succès');
    }
  });
})

module.exports = router;

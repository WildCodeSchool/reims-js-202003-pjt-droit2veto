const express = require('express');
const router = express.Router();
const { createToken } = require('../services/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');



router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return (
        res.status(500).json({ error: err })
      );
    } 
    if (!user) {
      return (
        res.status(404).json({ error: 'email ou mot de passe incorrect' })
      );
    }
    bcrypt.compare(password, user.password, function(errCompare, result) {
      if(result) {
        const token = createToken(user);
        res.json({ user, token });

      } else {
        res.status(500).json({message: "mot de passe ou email incorrect" })
      } 
    });      
  });
});

module.exports = router;

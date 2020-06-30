const express = require('express');
const router = express.Router();
const { createToken } = require('../services/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const connection = require('../conf');

router.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      return (
        res.status(500).json({ error: err })
      );
    } 
    if (!user) {
      return (
        res.json({ error: 'email ou mot de passe incorrect' })
      );
    }
    connection.query('SELECT password FROM DVM_Legal_Entity WHERE email = ?', email, (error, results) => {
      if (error) {
        return (
          res.status(500).json({ error })
        );
      } 
      console.log(results);
      bcrypt.compare(password, results.password, function(err2, res2) {
        console.log(err2);
        if(res2) {
          const token = createToken(user);
          res.json({ user, token });
        } else {
          res.status(500).json({message: "mot de passe ou email incorrect" })
        } 
      });      
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { createToken } = require('../services/jwt');
const User = require('../models/User');

router.post('/login', (req, res) => {
  User.findByEmailAndPassword(req.body.email, req.body.password, (err, user) => {
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
    const token = createToken(user);
    res.json({ user, token });
  });
});

module.exports = router;

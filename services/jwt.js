// services/jwt.js
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const JWT_KEY = require('./key');

const createToken = user => (
   jwt.sign(
       { id: user.id },
       JWT_KEY,
       {
           expiresIn: 60 * 60 * 24,// or '24h' or '1 day'
       },
   )
);

const authenticateWithJwt = expressJwt({
    secret: JWT_KEY,
    algorithms: ['RS256']
})

module.exports = { createToken, authenticateWithJwt };
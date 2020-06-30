const connection = require('../conf');
const User = {};
 
User.findByEmailAndPassword = (email, password, callback) => {
    connection.query(
        `SELECT * FROM DVM_Legal_Entity WHERE email = ?`,
        [email, password],
        (err, results, fields) => callback(err, results ? results[0] : null, fields)
    )
}

User.getAll = (callback) => {
    connection.query(
        `SELECT id, email FROM DVM_Legal_Entity`,
        (err, results, fields) => callback(err, results, fields)
    )
}
 
module.exports = User;
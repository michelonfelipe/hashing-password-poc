const db = require('./database');

const plain = ({email, password}) => db.User.create({email, password})

module.exports = {
  plain: plain
}
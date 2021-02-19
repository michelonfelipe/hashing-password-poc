const crypto = require('crypto');
const db = require('./database');

const plain = ({email, password}) => db.User.create({email, password})

const md5 = ({email, password}) => db.User.create({
  email: email,
  password: crypto.createHash('md5').update(password).digest('hex'),
})

const sha256 = ({email, password}) => db.User.create({
  email: email,
  password: crypto.createHash('sha256').update(password).digest('hex'),
})

const salt = ({email, password}) => {
  const salt = crypto.randomBytes(16).toString('hex')
  return db.User.create({
    salt: salt,
    email: email,
    password: crypto.scryptSync(password, salt, 32).toString('hex'),
  })
}

const pepper = ({email, password}) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const pepper = process.env.PEPPER
  return db.User.create({
    salt: salt,
    email: email,
    password: crypto.scryptSync(`${pepper}${password}`, salt, 32).toString('hex'),
  })
}

module.exports = {
  plain,
  md5,
  sha256,
  salt,
  pepper,
}
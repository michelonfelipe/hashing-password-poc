const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch (error => {
  console.error('Unable to connect to the database:', error);
})

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = {
  sequelize: sequelize,
  User: User
};
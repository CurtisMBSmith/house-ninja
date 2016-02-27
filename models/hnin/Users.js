var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.pgconn);

var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  given_name: {
    type: Sequelize.STRING(50),
  },
  surname: {
    type: Sequelize.STRING(50),
  },
  inserted: {
    type: Sequelize.DATE,
  }
});

module.exports.User = User;

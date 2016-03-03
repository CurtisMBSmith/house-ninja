'use strict';

var hninModels = require('../../models/hnin/index.js');
var sequelize = hninModels.sequelize;

sequelize
  .authenticate()
  .then(function(err) {
    console.log('successfully connected to database.');
  }, function (err) {
    console.log('Database connection failed:', err);
  });

sequelize
  .sync({ force: true , logging: console.log })
  .then(function(err) {
    console.log('Database rebuilt.');

    hninModels.Users.create({
      email: 'Curtis.MBSmith@gmail.com',
      givenName: 'Curtis',
      surname: 'Smith',
      password: 'ChangePassword1'
    });
  }, function(err) {
    console.log('An error occurred while setting up the database: ', err);
  });

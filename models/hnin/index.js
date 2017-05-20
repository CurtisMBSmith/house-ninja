'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.pgconn);

var modelNames = [
  'User',
  'Household',
  'HouseholdUser',
  'Session'
];

modelNames.forEach(function(model) {
  console.log('Importing ' + __dirname + '/' + model + '.js');
  module.exports[model] = sequelize.import(__dirname + '/' + model+ '.js');
});

// Set up relations
(function(exp) {
  // Associate the Users to Households
  exp.User.belongsToMany(exp.Household, {
    through: {
      model: exp.HouseholdUser,
      unique: true
    },
    foreignKey: 'userId'
  });

  exp.Household.belongsToMany(exp.User, {
    through: {
      model: exp.HouseholdUser,
      unique: true
    },
    foreignKey: 'householdId'
  });

  // Associate a user as the creator of a household
  exp.Household.belongsTo(exp.User, {
    foreignKey: 'createdBy',
    onDelete: 'NO ACTION'
  });

})(module.exports);

module.exports.sequelize = sequelize;

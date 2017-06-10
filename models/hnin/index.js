'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.pgconn);

var modelNames = [
  'User',
  'Household',
  'HouseholdUser',
  'Session',
  'PlannedDay',
  'PlannedMeal',
  'Item',
  'CookItem',
  'PlannedMealItem',
  'UserPlannedMeal'
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

  // Associate a planned day to a household
  exp.PlannedDay.belongsTo(exp.Household, {
    foreignKey: 'householdId'
  });

  exp.Household.hasMany(exp.PlannedDay, {
    foreignKey: 'householdId'
  });

  // Associate a planned meal to a planned day
  exp.PlannedMeal.belongsTo(exp.PlannedDay, {
    foreignKey: 'plannedDayId'
  });

  exp.PlannedDay.hasMany(exp.PlannedMeal, {
    foreignKey: 'plannedDayId'
  });

  // Associate Item with PlannedDay through CookItem
  exp.Item.belongsToMany(exp.PlannedDay, {
    through: {
      model: exp.CookItem
    },
    foreignKey: 'itemId'
  });

  exp.PlannedDay.belongsToMany(exp.Item, {
    through: {
      model: exp.CookItem
    },
    foreignKey: 'plannedDayId'
  });

  // Associate Item with PlannedMeal through PlannedMealItem
  exp.Item.belongsToMany(exp.PlannedMeal, {
    through: {
      model: exp.PlannedMealItem
    },
    foreignKey: 'itemId'
  });

  exp.PlannedMeal.belongsToMany(exp.Item, {
    through: {
      model: exp.PlannedMealItem
    },
    foreignKey: 'plannedMealId'
  });

  // Associate PlannedMeal with User through UserPlannedMeal
  exp.User.belongsToMany(exp.PlannedMeal, {
    through: {
      model: exp.UserPlannedMeal
    },
    foreignKey: 'userId'
  });

  exp.PlannedMeal.belongsToMany(exp.User, {
    through: {
      model: exp.UserPlannedMeal
    },
    foreignKey: 'plannedMealId'
  });

  // Associate an item to a household
  exp.Item.belongsTo(exp.Household, {
    foreignKey: 'housholdId'
  });

  exp.Household.hasMany(exp.Item, {
    foreignKey: 'householdId'
  });
})(module.exports);

module.exports.sequelize = sequelize;

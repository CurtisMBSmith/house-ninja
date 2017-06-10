'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserPlannedMeal = sequelize.define('UserPlannedMeal', {
    plannedMealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return UserPlannedMeal;
};

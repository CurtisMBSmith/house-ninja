'use strict';

module.exports = function(sequelize, DataTypes) {
  var PlannedMeal = sequelize.define('PlannedMeal', {
    plannedDayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
      allowNull: false,
    }
  });

  return PlannedMeal;
};

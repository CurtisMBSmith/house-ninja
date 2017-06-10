'use strict';

module.exports = function(sequelize, DataTypes) {
  var PlannedMealItem = sequelize.define('PlannedMealItem', {
    plannedMealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return PlannedMealItem;
};

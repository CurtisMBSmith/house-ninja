'use strict';

module.exports = function(sequelize, DataTypes) {
  var PlannedCook = sequelize.define('PlannedCook', {
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return PlannedCook;
};

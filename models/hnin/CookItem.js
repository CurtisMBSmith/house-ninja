'use strict';

module.exports = function(sequelize, DataTypes) {
  var CookItem = sequelize.define('CookItem', {
    plannedDayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return CookItem;
};

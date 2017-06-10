'use strict';

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Item;
};

'use strict';

module.exports = function(sequelize, DataTypes) {
  var Household = sequelize.define('Household', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.DOUBLE
    },
    long: {
        type: DataTypes.DOUBLE
    },
    locGran: {
        type: DataTypes.ENUM('FINE', 'COARSE', 'USER', 'NONE')
    },
    createdBy: {
        type: DataTypes.INTEGER
    }

  });

  return Household;
};


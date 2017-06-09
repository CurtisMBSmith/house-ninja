'use strict';

module.exports = function(sequelize, DataTypes) {
  var PlannedDay = sequelize.define('PlannedDay', {
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['householdId', 'date']
      }
    ]
  });

  return PlannedDay;
};

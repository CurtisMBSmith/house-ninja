'use strict';

module.exports = function(sequelize, DataTypes) {
  var HouseholdUsers = sequelize.define('HouseholdUsers', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'uk_household_user'
    },
    householdId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'uk_household_user'
    },
  });

  return HouseholdUsers;
};

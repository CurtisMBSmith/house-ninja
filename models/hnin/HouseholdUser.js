'use strict';

module.exports = function(sequelize, DataTypes) {
  var HouseholdUser = sequelize.define('HouseholdUser', {
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

  return HouseholdUser;
};

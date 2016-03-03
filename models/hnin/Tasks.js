'use strict';

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due: {
      type: DataTypes.DATE
    },
    completed: {
      type: DataTypes.DATE
    },
    completedBy: {
      type: DataTypes.INTEGER
    }
  });

  return Task;
};

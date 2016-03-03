'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.pgconn);

var modelNames = [
  'Users',
  'Tasks',
  'Households',
  'HouseholdUsers'
];


modelNames.forEach(function(model) {
  console.log('Importing ' + __dirname + '/' + model + '.js');
  module.exports[model] = sequelize.import(__dirname + '/' + model+ '.js');
});

// (function(mod) {
//   mod.Tasks.belongsTo(mod.Users);
// })(module.exports);

module.exports.sequelize = sequelize;

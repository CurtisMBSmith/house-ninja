var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.pgconn);

var modelNames = [
  'Users',
  // 'Tasks',
  // 'Households'
];


modelNames.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// (function(mod) {
//   mod.Tasks.belongsTo(mod.Users);
// })(module.exports);

module.exports.sequelize = sequelize;

'use strict';
var program = require('commander');

var hninModels = require('../../models/hnin/index.js');
var SampleData = require('../../test/sampledata/import_sample_data.js');
var sequelize = hninModels.sequelize;

// Set up the command-line interface.
program
  .version('1.0.0')
  .usage('[options] ') // TODO - Customize this.
  .option('-s, --sampleData', 'Deploy sample data.')
  .option('-r, --refresh', 'Refresh schemas.')
  .option('-v, --verbose', 'Increase logging.')
  .parse(process.argv);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('successfully connected to database.');
  }, function (err) {
    console.log('Database connection failed:', err);
  });

var opts = {
  force: program.refresh,
  logging: program.verbose ? console.log : undefined
};

sequelize
  .sync(opts)
  .then(function(err) {
    opts.force ? console.log('Database refreshed.') : console.log('Database synced');

    if (program.refresh) {
      SampleData.importSampleData(hninModels);
    }
  }, function(err) {
    console.log('An error occurred while setting up the database: ', err);
  });

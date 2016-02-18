var pg = require('pg');
var fs = require('fs');
var program = require('commander');

// Set up the command-line interface.
program
  .version('1.0.0')
  .usage('[options] ') // TODO - Customize this.
  .option('-s, --sampleData', 'Deploy sample data.')
  .option('-r, --refresh', 'Refresh schemas.')
  .option('-v, --version <n>', parseInt)
  .parse(process.argv);

var dbUri = process.env.pgconn;
if (!dbUri) {
  console.error('Must specify postgres connection string with \'pgconn\' variable.');
  process.exit(1);
}

function toFileObj(file, dir) {
  return {
    name: file,
    full_name: dir + file,
    ext: file.split('.')[file.split('.').length - 1],
    version_num: Number(file.split('_')[0])
  };
}

function filterNonSql(files) {
  return files.filter(function (file) {
    return file.ext === 'sql';
  });
}

function sortByVersNum(files, desc) {
  desc = desc || false;
  return files.sort(function(file1, file2) {
    return desc ? file2.version_num - file1.version_num
        : file1.version_num - file2.version_num;
  });
}

function filterAboveTargetVers(files, targetVers) {
  return files.filter(function(file) {
    return file.version_num <= targetVers;
  });
}

function readSqlFilesFromDir(dir, targetVers, desc) {
  console.log('Reading files from dir: ' + dir);
  var files = fs.readdirSync(dir);

  var sqlFiles = [];
  files.forEach(function(file) {
    sqlFiles.push(toFileObj(file, dir));
  });

  sqlFiles = filterNonSql(sqlFiles);
  sqlFiles = sortByVersNum(sqlFiles, desc);
  if (targetVers) {
    sqlFiles = filterAboveTargetVers(sqlFiles, targetVers);
    console.log(sqlFiles);
  }

  return sqlFiles;
}

function executeSql(dbUri, sqlFile) {
  console.log('Executing file ' + sqlFile.name + ' on schema...');
  fs.readFile(sqlFile.full_name, 'utf8', function(err, sql) {
    if (err) {
      throw err;
    }

    pg.connect(dbUri, function(err, client, done) {
      if (err) {
        throw err;
      }

      client.query(sql, function(err, result) {
        if (err) {
          throw err;
        }

        console.log('SQL executed successsfully.');
        done();
      });
    });
  });
}

function executeSqlFiles(dbUri, sqlFiles) {
  sqlFiles.forEach(function(fileObj) {
    executeSql(dbUri, fileObj);
  });
}

function tearDownSchema(dbUri, dbScriptPath, targetVers) {
  var sqlFiles = readSqlFilesFromDir(dbScriptPath + 'down/', targetVers, true);

  console.log('Tearing down database...');

  executeSqlFiles(dbUri, sqlFiles);
}

function deployDb(dbUri, dbScriptPath, toVers) {
  var sqlFiles = readSqlFilesFromDir(dbScriptPath + 'up/', toVers, false);

  if (toVers) {
    console.log('Deploying schema version ' + toVers);
  } else {
    console.log('Deploying latest schema.');
  }

  executeSqlFiles(dbUri, sqlFiles);
}

function deployData(dbUri, dbScriptRoot, toVers, dataDir) {
  var sqlFiles = readSqlFilesFromDir(dbScriptRoot + 'data/' + dataDir + '/', toVers, false);

  console.log('Deploying data from ' + dataDir + ' directory...');

  executeSqlFiles(dbUri, sqlFiles);
}

function setUpSchema(dbUri, dbScriptPath, toVers) {
  deployDb(dbUri, dbScriptPath, toVers);
  deployData(dbUri, dbScriptPath, toVers, 'base');
}

function main(dbUri, prog, dbScriptPath) {
  var targetVersion = prog.version.option;

  if (prog.refresh) {
    tearDownSchema(dbUri, dbScriptPath, targetVersion);
  }

  setUpSchema(dbUri, dbScriptPath, targetVersion);

  if (prog.sampleData) {
    deployData(dbUri, dbScriptPath, targetVersion, 'sample');
  }
}

main(dbUri, program, 'db/postgres/');


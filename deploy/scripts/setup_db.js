var pg = require('pg');
var fs = require('fs');

var dbUri = process.env.pgconn;
if (!dbUri) {
  console.error('Must specify postgres connection string with \'pgconn\' variable.');
  process.exit(1);
}

function toFileObj(file) {
  return {
    name: file,
    ext: file.split('.')[file.split('.').length - 1],
    version_num: Number(file.split('_')[0])
  };
}

function filterNonSql(files) {
  return files.filter(function (file) {
    return file.ext === 'sql';
  });
}

function sortByVersNum(files) {
  return files.sort(function(file1, file2) {
    return file1.version_num - file2.version_num;
  });
}

function filterAboveTargetVers(files, targetVers) {
  return files.filter(function(file) {
    return file.version_num <= targetVers;
  });
}

function main(dbUri, dbScriptPath) {
  var files = fs.readdirSync(dbScriptPath);

  var targetVersion = process.argv[2];

  var sqlFiles = [];
  files.forEach(function(file) {
    sqlFiles.push(toFileObj(file));
  });

  sqlFiles = filterNonSql(sqlFiles);
  sqlFiles = sortByVersNum(sqlFiles);
  if (targetVersion) {
    sqlFiles = filterAboveTargetVers(sqlFiles, targetVersion);
  }

  if (targetVersion) {
    console.log('Deploying schema version ' + targetVersion);
  } else {
    console.log('Deploying latest schema.');
  }

  sqlFiles.forEach(function(fileObj) {
    console.log('Deploying ' + fileObj.name);
    fs.readFile(dbScriptPath + fileObj.name, 'utf8', function(err, sql) {
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
  });
}

main(dbUri, 'db/postgres/');


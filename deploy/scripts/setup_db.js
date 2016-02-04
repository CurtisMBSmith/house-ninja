var pg = require('pg');

var dbUri = process.env.pgconn;
if (!dbUri) {
  console.error('Must specify postgres connection string with \'pgconn\' variable.');
  process.exit(1);
}

var client = new pg.Client(dbUri);
client.connect();
console.log('Connected.');
client.end();

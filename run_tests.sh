#! /bin/bash
. test/conf/testdb.properties

export pgconn="postgres://${pguser}:${pgpass}@${pghost}:${pgport}/${pgschema}"

# Synchronize the database and force a rebuild
node deploy/scripts/sync_db.js -r

# Run the tests
mocha
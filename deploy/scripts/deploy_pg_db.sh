#! /bin/bash
. conf/properties/pgdb.properties

export pgconn="postgres://${pguser}:${pgpass}@${pghost}:${pgport}/${pgschema}"

node deploy/scripts/setup_db.js

CREATE SCHEMA IF NOT EXISTS hnin;

CREATE TABLE hnin.users (
    id              SERIAL  PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    given_name      VARCHAR(50),
    surname         VARCHAR(50),
    inserted        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login      TIMESTAMP
);

CREATE TYPE granularity AS ENUM ('FINE', 'COARSE', 'USER', 'NONE');

CREATE TABLE hnin.households (
    id              BIGSERIAL  PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(50) NOT NULL,
    lat             DOUBLE PRECISION,
    long            DOUBLE PRECISION,
    loc_gran        granularity  DEFAULT 'NONE',
    created_by      INTEGER  REFERENCES hnin.users,
    created_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by INTEGER  REFERENCES hnin.users,
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hnin.tasks (
    id              BIGSERIAL  PRIMARY KEY,
    description     VARCHAR(150) NOT NULL,
    due             TIMESTAMP,
    completed       TIMESTAMP,
    created_by      INTEGER  REFERENCES hnin.users,
    completed_by    INTEGER  REFERENCES hnin.users
);

CREATE TABLE hnin.household_users (
    id              BIGSERIAL  PRIMARY KEY,
    user_id         BIGINT  REFERENCES hnin.users,
    household_id    BIGINT  REFERENCES hnin.households,
    UNIQUE          (user_id, household_id)
);

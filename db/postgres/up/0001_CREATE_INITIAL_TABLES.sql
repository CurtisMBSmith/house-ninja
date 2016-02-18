CREATE SCHEMA IF NOT EXISTS hnin;

CREATE TABLE users (
    id              SERIAL  PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    given_name      VARCHAR(50),
    surname         VARCHAR(50),
    inserted        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login      TIMESTAMP
);

CREATE TYPE granularity AS ENUM ('FINE', 'COARSE', 'USER', 'NONE');

CREATE TABLE households (
    id              BIGSERIAL  PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(50) NOT NULL,
    lat             DOUBLE PRECISION,
    long            DOUBLE PRECISION,
    loc_gran        granularity  DEFAULT 'NONE',
    created_by      INTEGER  REFERENCES users,
    created_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by INTEGER  REFERENCES users,
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id              BIGSERIAL  PRIMARY KEY,
    description     VARCHAR(150) NOT NULL,
    due             TIMESTAMP,
    completed       TIMESTAMP,
    created_by      INTEGER  REFERENCES users,
    completed_by    INTEGER  REFERENCES users
);

CREATE TABLE household_users (
    id              BIGSERIAL  PRIMARY KEY,
    user_id         BIGINT  REFERENCES users,
    household_id    BIGINT  REFERENCES households,
    UNIQUE          (user_id, household_id)
);

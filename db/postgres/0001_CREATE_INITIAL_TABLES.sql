CREATE TABLE user (
    id              SERIAL  PRIMARY KEY,
    email           VARCHAR(255) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    given_name      VARCHAR(50),
    surname         VARCHAR(50),
    inserted        TIMESTAMP,
    last_login      TIMESTAMP
);

CREATE TYPE granularity AS ENUM ('FINE', 'COARSE', 'USER', 'NONE');

CREATE TABLE household (
    id              BIGSERIAL  PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(50) NOT NULL,
    lat             DOUBLE PRECISION,
    long            DOUBLE PRECISION,
    loc_gran        granularity  DEFAULT 'NONE'
);

CREATE TABLE task (
    id              BIGSERIAL  PRIMARY KEY,
    desc            VARCHAR(150) NOT NULL,
    due             TIMESTAMP,
    completed       TIMESTAMP,
    created_by      SERIAL,
    completed_by    SERIAL
);

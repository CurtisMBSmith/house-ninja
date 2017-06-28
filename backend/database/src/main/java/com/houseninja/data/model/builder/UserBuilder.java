package com.houseninja.data.model.builder;

import com.houseninja.data.model.Household;
import com.houseninja.data.model.User;

import java.time.Instant;

public class UserBuilder {
    private Long id;
    private String email;
    private String givenName;
    private String surname;
    private Instant createdAt;
    private Instant lastUpdateAt;
    private Household household;

    public UserBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public UserBuilder setEmail(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder setGivenName(String givenName) {
        this.givenName = givenName;
        return this;
    }

    public UserBuilder setSurname(String surname) {
        this.surname = surname;
        return this;
    }

    public UserBuilder setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public UserBuilder setLastUpdateAt(Instant lastUpdateAt) {
        this.lastUpdateAt = lastUpdateAt;
        return this;
    }

    public UserBuilder setHousehold(Household household) {
        this.household = household;
        return this;
    }

    public User createUser() {
        return new User(id, email, givenName, surname, createdAt, lastUpdateAt, household);
    }
}

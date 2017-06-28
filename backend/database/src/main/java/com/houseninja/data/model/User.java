package com.houseninja.data.model;

import java.time.Instant;

public class User {
    private Long id;
    private String email;
    private String givenName;
    private String surname;
    private Instant createdAt;
    private Instant lastUpdateAt;
    private Household household;

    public User(Long id, String email, String givenName, String surname, Instant createdAt, Instant lastUpdateAt,
                Household household) {
        this.id = id;
        this.email = email;
        this.givenName = givenName;
        this.surname = surname;
        this.createdAt = createdAt;
        this.lastUpdateAt = lastUpdateAt;
        this.household = household;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastUpdateAt() {
        return lastUpdateAt;
    }

    public void setLastUpdateAt(Instant lastUpdateAt) {
        this.lastUpdateAt = lastUpdateAt;
    }

    public Household getHousehold() {
        return household;
    }

    public void setHousehold(Household household) {
        this.household = household;
    }
}

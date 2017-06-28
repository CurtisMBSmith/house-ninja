package com.houseninja.data.model.builder;

import com.houseninja.data.model.Household;
import com.houseninja.data.model.User;

import java.time.Instant;
import java.util.List;

public class HouseholdBuilder {
    private Long id;
    private String name;
    private Instant createdAt;
    private Instant lastUpdatedAt;
    private List<User> users;

    public HouseholdBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public HouseholdBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public HouseholdBuilder setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public HouseholdBuilder setLastUpdatedAt(Instant lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
        return this;
    }

    public HouseholdBuilder setUsers(List<User> users) {
        this.users = users;
        return this;
    }

    public Household createHousehold() {
        return new Household(id, name, createdAt, lastUpdatedAt, users);
    }
}

package com.houseninja.data.model;

import java.time.Instant;
import java.util.List;

public class Household {
    private Long id;
    private String name;
    private Instant createdAt;
    private Instant lastUpdatedAt;
    private List<User> users;

    public Household(Long id, String name, Instant createdAt, Instant lastUpdatedAt, List<User> users) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.lastUpdatedAt = lastUpdatedAt;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(Instant lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}

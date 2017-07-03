package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.UsersDao;
import org.jooq.Configuration;

public class UserDao extends UsersDao {

    public UserDao(Configuration config) {
        super(config);
    }
}

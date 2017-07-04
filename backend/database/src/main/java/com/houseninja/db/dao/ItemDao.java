package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.ItemsDao;
import org.jooq.Configuration;

public class ItemDao extends ItemsDao {

    public ItemDao(Configuration config) {
        super(config);
    }
}

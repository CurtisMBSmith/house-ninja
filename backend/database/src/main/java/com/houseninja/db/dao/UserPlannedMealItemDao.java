package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.UserplannedmealitemsDao;
import com.houseninja.db.models.UserPlannedMealItems;
import org.jooq.Configuration;

import java.util.Collections;
import java.util.List;

public class UserPlannedMealItemDao extends UserplannedmealitemsDao {

    public UserPlannedMealItemDao(Configuration config) {
        super(config);
    }

    public List<UserPlannedMealItems> retrieveWithRels(long plannedMealItemId) {

        // TODO
        return Collections.emptyList();
    }
}

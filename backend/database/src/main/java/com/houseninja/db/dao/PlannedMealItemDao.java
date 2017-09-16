package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.PlannedmealitemsDao;
import com.houseninja.db.gen.tables.daos.UserplannedmealitemsDao;
import com.houseninja.db.gen.tables.pojos.Plannedmealitems;
import com.houseninja.db.models.PlannedMealItem;
import org.jooq.Configuration;

import java.util.List;
import java.util.stream.Collectors;

public class PlannedMealItemDao extends PlannedmealitemsDao {

    public PlannedMealItemDao(Configuration config) {
        super(config);
    }

    public List<PlannedMealItem> retrieveWithRels(long plannedMealId) {
        List<Plannedmealitems> plannedmealitems = fetchByPlannedMealId(plannedMealId);

        ItemDao itemDao = new ItemDao(configuration());
        UserPlannedMealItemDao userPlannedMealItemsDao  = new UserPlannedMealItemDao(configuration());
        return plannedmealitems.stream().map(mealItem -> {
            PlannedMealItem plannedMealItem = new PlannedMealItem(mealItem);
            plannedMealItem.setItem(itemDao.fetchOneById(plannedMealItem.getItemId()));
            plannedMealItem.setUserplannedmealitems(userPlannedMealItemsDao.retrieveWithRels(plannedMealItem.getId()));

            return plannedMealItem;
        }).collect(Collectors.toList());
    }

}

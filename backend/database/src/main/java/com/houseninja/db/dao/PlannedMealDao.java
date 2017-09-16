package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.PlannedmealsDao;
import com.houseninja.db.gen.tables.pojos.Plannedcooks;
import com.houseninja.db.gen.tables.pojos.Plannedmeals;
import com.houseninja.db.models.PlannedMeal;
import org.jooq.Configuration;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.houseninja.db.gen.Tables.PLANNEDCOOKS;
import static com.houseninja.db.gen.Tables.PLANNEDMEALS;
import static org.jooq.impl.DSL.using;

public class PlannedMealDao  extends PlannedmealsDao {

    public PlannedMealDao(Configuration config) {
        super(config);
    }


    public List<Plannedmeals> retrieve(LocalDate startDay, LocalDate endDay, Long householdId) {
        Date start = Date.valueOf(startDay);
        Date end = Date.valueOf(endDay);

        return using(configuration()).selectFrom(PLANNEDMEALS)
            .where(PLANNEDMEALS.DAY.lessOrEqual(end))
            .and(PLANNEDMEALS.DAY.greaterOrEqual(start))
            .and(PLANNEDMEALS.HOUSEHOLD_ID.eq(householdId))
            .fetch()
            .into(Plannedmeals.class);
    }

    public List<PlannedMeal> retrieveWithRels(LocalDate startDay, LocalDate endDay, Long householdId) {
        List<Plannedmeals> plannedMeals = retrieve(startDay, endDay, householdId);
        PlannedMealItemDao plannedMealItemDao = new PlannedMealItemDao(configuration());

        return plannedMeals.stream().map(meal -> {
           PlannedMeal plannedMeal = new PlannedMeal(meal);
           plannedMeal.setPlannedMealItems(plannedMealItemDao.retrieveWithRels(plannedMeal.getId()));

           return plannedMeal;
        }).collect(Collectors.toList());
    }
}

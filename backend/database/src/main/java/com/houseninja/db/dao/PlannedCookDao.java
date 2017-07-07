package com.houseninja.db.dao;

import static com.houseninja.db.gen.Tables.PLANNEDCOOKS;
import com.houseninja.db.gen.tables.daos.PlannedcooksDao;
import com.houseninja.db.gen.tables.pojos.Plannedcooks;
import com.houseninja.db.gen.tables.records.PlannedcooksRecord;
import org.jooq.Condition;
import org.jooq.Configuration;

import java.time.LocalDate;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.jooq.impl.DSL.using;

public class PlannedCookDao extends PlannedcooksDao {

    public PlannedCookDao(Configuration config) {
        super(config);
    }

    public List<Plannedcooks> retrieve(LocalDate day, Long householdId) {
        Date date = Date.valueOf(day);

        return using(configuration()).selectFrom(PLANNEDCOOKS)
            .where(PLANNEDCOOKS.DAY.eq(date))
            .and(PLANNEDCOOKS.HOUSEHOLD_ID.eq(householdId))
            .fetch()
            .into(Plannedcooks.class);
    }

    public Plannedcooks createReturningId(Plannedcooks plannedCooks) {
        PlannedcooksRecord result = using(configuration())
            .insertInto(PLANNEDCOOKS, PLANNEDCOOKS.ITEM_ID, PLANNEDCOOKS.HOUSEHOLD_ID, PLANNEDCOOKS.DAY,
                PLANNEDCOOKS.COOK_TIME_MINS, PLANNEDCOOKS.COMPLETED, PLANNEDCOOKS.NUM_SERVINGS)
            .values(plannedCooks.getItemId(), plannedCooks.getHouseholdId(), plannedCooks.getDay(),
                plannedCooks.getCookTimeMins(), plannedCooks.getCompleted(), plannedCooks.getNumServings())
            .returning(PLANNEDCOOKS.ID, PLANNEDCOOKS.CREATED_AT, PLANNEDCOOKS.UPDATED_AT)
            .fetchOne();

        return plannedCooks.setId(result.getId()).setCreatedAt(result.getCreatedAt()).setUpdatedAt(result.getUpdatedAt());
    }

    public List<Plannedcooks> createReturningId(Plannedcooks... items) {
        return createReturningId(Arrays.asList(items));
    }

    public List<Plannedcooks> createReturningId(List<Plannedcooks> items) {
        items.stream().forEach(item -> createReturningId(item));
        return items;
    }
}

package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.HouseholdsDao;
import com.houseninja.db.gen.tables.pojos.Households;
import com.houseninja.db.gen.tables.records.HouseholdsRecord;
import org.jooq.Configuration;
import org.jooq.Result;

import static com.houseninja.db.gen.Tables.HOUSEHOLDS;
import static org.jooq.impl.DSL.using;

public class HouseholdDao extends HouseholdsDao {

    public HouseholdDao(Configuration conf) {
        super(conf);
    }

    public Households createReturningId(Households household) {
        HouseholdsRecord result = using(configuration())
            .insertInto(HOUSEHOLDS, HOUSEHOLDS.NAME, HOUSEHOLDS.TYPE, HOUSEHOLDS.LAT, HOUSEHOLDS.LONG,
                HOUSEHOLDS.CREATEDBY, HOUSEHOLDS.CREATEDAT, HOUSEHOLDS.UPDATEDAT)
            .values(household.getName(), household.getType(), household.getLat(), household.getLong(),
                household.getCreatedby(), household.getCreatedat(), household.getUpdatedat())
            .returning(HOUSEHOLDS.ID)
            .fetchOne();

        return household.setId(result.getId());
    }
}

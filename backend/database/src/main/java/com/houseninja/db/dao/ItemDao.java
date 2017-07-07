package com.houseninja.db.dao;

import com.houseninja.db.gen.tables.daos.ItemsDao;
import com.houseninja.db.gen.tables.pojos.Items;
import com.houseninja.db.gen.tables.records.ItemsRecord;
import org.jooq.Configuration;

import java.util.Arrays;
import java.util.List;

import static com.houseninja.db.gen.Tables.ITEMS;
import static org.jooq.impl.DSL.using;

public class ItemDao extends ItemsDao {

    public ItemDao(Configuration config) {
        super(config);
    }

    public Items createReturningId(Items item) {
        ItemsRecord result = using(configuration())
            .insertInto(ITEMS, ITEMS.DESCRIPTION, ITEMS.HOUSEHOLD_ID)
            .values(item.getDescription(), item.getHouseholdId())
            .returning(ITEMS.ID, ITEMS.CREATED_AT, ITEMS.UPDATED_AT)
            .fetchOne();

        return item.setId(result.getId()).setCreatedAt(result.getCreatedAt()).setUpdatedAt(result.getUpdatedAt());
    }

    public List<Items> createReturningId(Items... items) {
        return createReturningId(Arrays.asList(items));
    }

    public List<Items> createReturningId(List<Items> items) {
        items.stream().forEach(item -> createReturningId(item));
        return items;
    }
}

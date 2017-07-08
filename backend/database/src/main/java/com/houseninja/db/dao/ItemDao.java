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

    /**
     * Create an Item. Only the household_id and the description from the object
     * will be used - the created_at, updated_at, and id will be set by the DB.
     *
     * @param item The item object to be inserted.
     * @return The item object with the id, created_by, and updated_by fields
     * that were populated from the database.
     */
    public Items createReturningId(Items item) {
        ItemsRecord result = using(configuration())
            .insertInto(ITEMS, ITEMS.DESCRIPTION, ITEMS.HOUSEHOLD_ID)
            .values(item.getDescription(), item.getHouseholdId())
            .returning(ITEMS.ID, ITEMS.CREATED_AT, ITEMS.UPDATED_AT)
            .fetchOne();

        return item.setId(result.getId()).setCreatedAt(result.getCreatedAt()).setUpdatedAt(result.getUpdatedAt());
    }

    /**
     * Creates items based on {@link #createReturningId createReturningId}.
     *
     * @param items A varargs array of items to be created.
     * @return A List containing the items created.
     */
    public List<Items> createReturningId(Items... items) {
        return createReturningId(Arrays.asList(items));
    }

    /**
     * Creates items based on {@link #createReturningId createReturningId}.
     *
     * @param items A List of items to be created.
     * @return A List containing the items created.
     */
    public List<Items> createReturningId(List<Items> items) {
        items.stream().forEach(item -> createReturningId(item));
        return items;
    }

    /**
     * Retrieve the items for the given household, as well as any "unrooted" items
     * (ie. with no household). The items are ordered by description at database
     * level.
     *
     * @param householdId The household database id to retrieve the items for.
     * @return A List containing the Items as described.
     */
    public List<Items> retrieve(Long householdId) {
        return using(configuration())
            .selectFrom(ITEMS)
            .where(ITEMS.HOUSEHOLD_ID.eq(householdId).or(ITEMS.HOUSEHOLD_ID.isNull()))
            .orderBy(ITEMS.DESCRIPTION)
            .fetch().into(Items.class);
    }
}

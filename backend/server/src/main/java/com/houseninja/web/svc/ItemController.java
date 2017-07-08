package com.houseninja.web.svc;

import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.dao.ItemDao;
import com.houseninja.db.gen.tables.daos.HouseholdusersDao;
import com.houseninja.db.gen.tables.pojos.Items;
import com.houseninja.sec.HouseninjaUserDetails;
import com.houseninja.web.svc.util.UserPrincipalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

public class ItemController {

    private static final String BASE_PATH = "/item";

    @Autowired
    private ItemDao itemDao;

    @RequestMapping(value = BASE_PATH + "/create", method = RequestMethod.POST)
    public Items create(@RequestBody Items item) {
        Long householdId = UserPrincipalUtil.getUserPrincipal().getHouseholdId();
        if (householdId == null) {
            throw new RuntimeException("You must be in a household to create an item.");
        }

        item.setHouseholdId(householdId);

        return itemDao.createReturningId(item);
    }

    @RequestMapping(value = BASE_PATH + "/retrieve", method = RequestMethod.GET)
    public List<Items> retrieve() {
        Long householdId = UserPrincipalUtil.getUserPrincipal().getHouseholdId();
        if (householdId == null) {
            throw new RuntimeException("You must be in a household to view items.");
        }

        return itemDao.retrieve(householdId);
    }

    @RequestMapping(value = BASE_PATH + "/update", method = RequestMethod.PUT)
    public Items update(@RequestBody Items toUpdate) {
        validateExistenceOfItemForCurrentUser(toUpdate);

        // Set the update_at timestamp.
        toUpdate.setUpdatedAt(new Timestamp(Instant.now().toEpochMilli()));
        itemDao.update(toUpdate);
        return toUpdate;
    }

    @RequestMapping(value = BASE_PATH + "/remove", method = RequestMethod.DELETE)
    public void delete(@RequestBody Items toDelete) {
        validateExistenceOfItemForCurrentUser(toDelete);
        itemDao.delete(toDelete);
    }

    private void validateExistenceOfItemForCurrentUser(Items item) {
        Long householdId = UserPrincipalUtil.getUserPrincipal().getHouseholdId();
        if (householdId == null) {
            throw new RuntimeException("You must be in a household to view items.");
        }

        if (item.getId() == null) {
            throw new RuntimeException("Cannot update a record with no ID.");
        }

        Items currentRecord = itemDao.fetchOneById(item.getId());

        if (currentRecord == null || !householdId.equals(currentRecord.getHouseholdId())) {
            throw new RuntimeException("No record found for the current household with the given id.");
        }
    }
}

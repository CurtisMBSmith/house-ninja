package com.houseninja.inttest.db.tables.daos;

import com.houseninja.db.conf.HouseNinjaDBConfig;
import com.houseninja.db.conf.HouseNinjaDaoBeans;
import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.dao.ItemDao;
import com.houseninja.db.dao.PlannedCookDao;
import com.houseninja.db.dao.UserDao;
import com.houseninja.db.gen.tables.pojos.Households;
import com.houseninja.db.gen.tables.pojos.Items;
import com.houseninja.db.gen.tables.pojos.Plannedcooks;
import com.houseninja.db.gen.tables.pojos.Users;
import com.houseninja.inttest.db.conf.TestDBConf;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.sql.Date;
import java.time.OffsetDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {HouseNinjaDBConfig.class, HouseNinjaDaoBeans.class, TestDBConf.class})
public class PlannedCookDaoTest {

    @Autowired
    private HouseholdDao householdDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PlannedCookDao plannedCookDao;

    @Autowired
    private ItemDao itemDao;

    private Random rand;
    private LocalDate today;

    private Users createdUser;
    private Households createdHousehold;
    private List<Plannedcooks> createdCooks;
    private List<Items> createdItems;

    @Before
    public void beforeTest() {
        rand = new Random();
        today = LocalDate.now();

        OffsetDateTime now = OffsetDateTime.now();
        Users user = new Users().setEmail(UUID.randomUUID().toString())
            .setCreatedat(now).setGivenname("Test")
            .setSurname("User").setPassword(UUID.randomUUID().toString())
            .setUpdatedat(now);

        userDao.insert(user);

        createdUser = userDao.fetchOneByEmail(user.getEmail());

        Double lat = Math.random();
        Double longi = Math.random();
        String name = UUID.randomUUID().toString();
        String type = "TestType";

        Households toCreate = new Households().setCreatedat(now)
            .setCreatedby(createdUser.getId()).setUpdatedat(now)
            .setName(name).setType(type).setLat(lat).setLong(longi);

        createdHousehold = householdDao.createReturningId(toCreate);

        createdItems = itemDao.createReturningId(new Items().setDescription("Test item 1").setHouseholdId(toCreate.getId()),
            new Items().setDescription("Test item 2").setHouseholdId(toCreate.getId()));

        createdCooks = new LinkedList<>();
    }

    @After
    public void cleanUp() {
        plannedCookDao.delete(createdCooks);
        itemDao.delete(createdItems);
        householdDao.delete(createdHousehold);
        userDao.delete(createdUser);
    }

    @Test
    public void basicRetrieve() {
        createdCooks.add(plannedCookDao.createReturningId(new Plannedcooks().setHouseholdId(createdHousehold.getId())
        .setItemId(createdItems.get(0).getId()).setCookTimeMins(rand.nextInt()).setNumServings((short) rand.nextInt(100))
            .setDay(Date.valueOf(today))));

        Plannedcooks expected = createdCooks.get(0);
        List<Plannedcooks> result = plannedCookDao.retrieve(today, createdHousehold.getId());
        assertEquals(1, result.size());
        assertPlannedCooksEqual(expected, result.get(0));
    }

    private void assertPlannedCooksEqual(Plannedcooks expected, Plannedcooks actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getCompleted(), actual.getCompleted());
        assertEquals(expected.getCookTimeMins(), actual.getCookTimeMins());
        assertEquals(expected.getCreatedAt(), actual.getCreatedAt());
        assertEquals(expected.getDay(), actual.getDay());
        assertEquals(expected.getItemId(), actual.getItemId());
        assertEquals(expected.getHouseholdId(), actual.getHouseholdId());
        assertEquals(expected.getUpdatedAt(), actual.getUpdatedAt());
        assertEquals(expected.getNumServings(), actual.getNumServings());
    }
}

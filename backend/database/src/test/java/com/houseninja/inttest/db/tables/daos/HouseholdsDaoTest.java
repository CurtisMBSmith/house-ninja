package com.houseninja.inttest.db.tables.daos;

import com.houseninja.db.conf.HouseNinjaDBConfig;
import com.houseninja.db.conf.HouseNinjaDaoBeans;
import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.dao.UserDao;
import com.houseninja.db.gen.tables.pojos.Households;
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
import java.util.Date;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {HouseNinjaDBConfig.class, HouseNinjaDaoBeans.class, TestDBConf.class})
public class HouseholdsDaoTest {

    @Autowired
    private HouseholdDao householdDao;

    @Autowired
    private UserDao userDao;

    private Users createdUser;
    private Households createdHousehold;

    @Before
    public void beforeTest() {
        Date now = new Date();
        Users user = new Users().setEmail(UUID.randomUUID().toString())
            .setCreatedat(new Timestamp(now.getTime())).setGivenname("Test")
            .setSurname("User").setPassword(UUID.randomUUID().toString())
            .setUpdatedat(new Timestamp(now.getTime()));

        userDao.insert(user);

        createdUser = userDao.fetchOneByEmail(user.getEmail());
    }

    @After
    public void cleanUp() {
        if (createdHousehold != null) {
            householdDao.delete(createdHousehold);
        }

        if (createdUser != null) {
            userDao.delete(createdUser);
        }
    }

    @Test
    public void createReturningId() {
        Timestamp now = new Timestamp(Instant.now().toEpochMilli());
        Double lat = Math.random();
        Double longi = Math.random();
        String name = UUID.randomUUID().toString();
        String type = "TestType";
        Households toCreate = new Households().setCreatedat(now)
            .setCreatedby(createdUser.getId()).setUpdatedat(now)
            .setName(name).setType(type).setLat(lat).setLong(longi);

        createdHousehold = householdDao.createReturningId(toCreate);

        assertNotNull(createdHousehold.getId());
        assertEquals(name, createdHousehold.getName());
        assertEquals(now, createdHousehold.getCreatedat());
        assertEquals(createdUser.getId(), createdHousehold.getCreatedby());
        assertEquals(lat, createdHousehold.getLat(), 0);
        assertEquals(longi, createdHousehold.getLong(), 0);
        assertEquals(now, createdHousehold.getUpdatedat());
        assertEquals(type, createdHousehold.getType());
    }
}

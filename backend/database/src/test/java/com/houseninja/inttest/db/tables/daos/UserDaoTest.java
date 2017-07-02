package com.houseninja.inttest.db.tables.daos;

import com.houseninja.db.conf.HouseNinjaDBConfig;
import com.houseninja.db.conf.HouseNinjaDaoBeans;
import com.houseninja.db.gen.tables.daos.UsersDao;
import com.houseninja.db.gen.tables.pojos.Users;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {HouseNinjaDBConfig.class, HouseNinjaDaoBeans.class})
public class UserDaoTest {

    @Autowired
    private UsersDao userDao;

    private Users created;

    @After
    public void tearDown() {
        if (created != null) {
            userDao.delete(created);
        }
    }

    @Test
    public void userCreate() {
        Date now = new Date();
        Users user = new Users().setEmail(UUID.randomUUID().toString())
            .setCreatedat(new Timestamp(now.getTime())).setGivenname("Test")
            .setSurname("User").setPassword(UUID.randomUUID().toString())
            .setUpdatedat(new Timestamp(now.getTime()));

        userDao.insert(user);

        created = userDao.fetchOneByEmail(user.getEmail());
        assertNotNull(created.getId());
        assertEquals(user.getCreatedat(), created.getCreatedat());
        assertEquals(user.getEmail(), created.getEmail());
        assertEquals(user.getPassword(), created.getPassword());
        assertEquals(user.getGivenname(), created.getGivenname());
        assertEquals(user.getSurname(), created.getSurname());
        assertEquals(user.getUpdatedat(), created.getUpdatedat());
    }
}

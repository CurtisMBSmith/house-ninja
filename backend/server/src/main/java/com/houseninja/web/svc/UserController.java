package com.houseninja.web.svc;

import com.houseninja.db.gen.tables.daos.UsersDao;
import com.houseninja.db.gen.tables.pojos.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
public class UserController {
    private static final String BASE_PATH = "/user";

    @Autowired
    private UsersDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = BASE_PATH + "/create", method = RequestMethod.POST)
    public Users create(@RequestBody Users user) {
        // Ensure that the user's ID is null (to be set by the DB).
        user.setId(null);

        if (user.getPassword() == null || user.getPassword().trim().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 digits long");
        }

        // Encode the user's password.
        user.setPassword(passwordEncoder.encode(user.getPassword().trim()));
        Instant now = Instant.now();
        user.setCreatedat(new Timestamp(now.toEpochMilli()));
        user.setUpdatedat(new Timestamp(now.toEpochMilli()));

        userDao.insert(user);

        return userDao.fetchOneByEmail(user.getEmail()).setPassword(null);
    }

    @RequestMapping(value = BASE_PATH + "/retrieve/{id}", method = RequestMethod.GET)
    public List<Users> retrieve(@PathVariable(value = "id") Long id) {
        return userDao.fetchById(id);
    }
}

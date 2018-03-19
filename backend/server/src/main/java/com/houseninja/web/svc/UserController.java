package com.houseninja.web.svc;

import com.houseninja.db.gen.tables.daos.UsersDao;
import com.houseninja.db.gen.tables.pojos.Users;
import com.houseninja.sec.HouseninjaUserDetails;
import com.houseninja.web.svc.util.UserPrincipalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
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
        OffsetDateTime now = OffsetDateTime.now();
        user.setCreatedat(now);
        user.setUpdatedat(now);

        userDao.insert(user);

        return userDao.fetchOneByEmail(user.getEmail()).setPassword(null);
    }

    @RequestMapping(value = BASE_PATH + "/details", method = RequestMethod.GET)
    public Users currentUserDetails() {
        HouseninjaUserDetails user = UserPrincipalUtil.getUserPrincipal();
        return userDao.fetchById(user.getId()).get(0).setPassword(null);
    }
}

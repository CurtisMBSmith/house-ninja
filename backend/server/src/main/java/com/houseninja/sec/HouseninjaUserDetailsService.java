package com.houseninja.sec;

import com.houseninja.db.gen.tables.daos.UsersDao;
import com.houseninja.db.gen.tables.pojos.Users;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.UserDetailsManagerConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

public class HouseninjaUserDetailsService implements UserDetailsService {

    private final UsersDao userDao;

    public HouseninjaUserDetailsService(UsersDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Authenticating " + username + "...");
        Users user = userDao.fetchOneByEmail(username);
        if (user == null) {
            System.out.println("User " + username + " not found.");
            throw new UsernameNotFoundException("User by email " + username + " not found.");
        }

        System.out.println("Found user id " + user.getId() + " with username " + username + ".");
        return new HouseninjaUserDetails(user);
    }
}

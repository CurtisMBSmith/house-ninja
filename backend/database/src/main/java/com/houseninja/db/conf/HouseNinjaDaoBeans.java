package com.houseninja.db.conf;

import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.dao.HouseholdUserDao;
import com.houseninja.db.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HouseNinjaDaoBeans {


    @Bean
    public UserDao userDao(@Autowired org.jooq.Configuration conf) {
        return new UserDao(conf);
    }

    @Bean
    public HouseholdDao householdDao(@Autowired org.jooq.Configuration conf) {
        return new HouseholdDao(conf);
    }

    @Bean
    public HouseholdUserDao householdUserDao(@Autowired org.jooq.Configuration conf) {
        return new HouseholdUserDao(conf);
    }
}

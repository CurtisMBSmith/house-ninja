package com.houseninja.db.conf;

import com.houseninja.db.gen.tables.daos.HouseholdsDao;
import com.houseninja.db.gen.tables.daos.UsersDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HouseNinjaDaoBeans {


    @Bean
    public UsersDao userDao(@Autowired org.jooq.Configuration conf) {
        return new UsersDao(conf);
    }

    @Bean
    public HouseholdsDao householdDao(@Autowired org.jooq.Configuration conf) {
        return new HouseholdsDao(conf);
    }
}

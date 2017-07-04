package com.houseninja.db.conf;

import com.houseninja.db.dao.*;
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

    @Bean
    public ItemDao itemDao(@Autowired org.jooq.Configuration conf) {
        return new ItemDao(conf);
    }

    @Bean
    public PlannedCookDao plannedCookDao(@Autowired org.jooq.Configuration conf) {
        return new PlannedCookDao(conf);
    }

    @Bean
    public PlannedMealDao plannedMealDao(@Autowired org.jooq.Configuration conf) {
        return new PlannedMealDao(conf);
    }

    @Bean
    public PlannedMealItemDao plannedMealItemDao(@Autowired org.jooq.Configuration conf) {
        return new PlannedMealItemDao(conf);
    }

    @Bean
    public UserPlannedMealItemDao userPlannedMealItemDao(@Autowired org.jooq.Configuration conf) {
        return new UserPlannedMealItemDao(conf);
    }
}

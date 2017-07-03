package com.houseninja.inttest.db.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = {"file:../conf/properties/pgdb.properties"})
public class TestDBConf {
}

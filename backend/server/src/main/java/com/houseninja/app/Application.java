package com.houseninja.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = {"file:backend/conf/properties/pgdb.properties"})
@ComponentScan(basePackages = "com.houseninja")
public class Application {

    public static void main(String... args) throws Exception {
//        System.out.println("CWD: " + System.getProperty("user.dir"));
        SpringApplication.run(Application.class, args);

    }
}


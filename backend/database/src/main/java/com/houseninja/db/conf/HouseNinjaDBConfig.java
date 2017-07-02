package com.houseninja.db.conf;

import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DataSourceConnectionProvider;
import org.jooq.impl.DefaultConfiguration;
import org.jooq.impl.DefaultDSLContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@PropertySource(value = {"file:conf/properties/pgdb.properties"})
@EnableTransactionManagement
public class HouseNinjaDBConfig {

    @Value("${pguser}")
    private String dbUser;

    @Value("${pgpass}")
    private String dbPass;

    @Value("${pghost}")
    private String dbHost;

    @Value("${pgport}")
    private String dbPort;

    @Value("${pgschema}")
    private String dbSchema;

    @Bean
    public static PropertySourcesPlaceholderConfigurer properties() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public DataSource dataSource() throws Exception {
        Properties props = new Properties();
        String dsUrl = "jdbc:postgresql://" + dbHost + ':' + dbPort + '/' + dbSchema;
        props.put("driverClassName", "org.postgresql.Driver");
        props.put("url", dsUrl);
        props.put("username", dbUser);
        props.put("password", dbPass);
        props.put("socketTimeout", "10");
        props.put("role", dbUser);

        return new DriverManagerDataSource(dsUrl, dbUser, dbPass);
    }

    @Bean
    public DataSourceTransactionManager transactionManager() throws Exception {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean
    public TransactionAwareDataSourceProxy transactionAwareDataSource() throws Exception {
        return new TransactionAwareDataSourceProxy(dataSource());
    }

    @Bean
    public DataSourceConnectionProvider connectionProvider() throws Exception {
        return new DataSourceConnectionProvider(dataSource());
    }

    @Bean
    public org.jooq.Configuration jooqConfig() throws Exception {
        org.jooq.Configuration conf = new DefaultConfiguration();
        conf.set(SQLDialect.POSTGRES);
        conf.set(connectionProvider());

        return conf;
    }

    @Bean
    public DSLContext dslCtx() throws Exception {
        return new DefaultDSLContext(jooqConfig());
    }
}

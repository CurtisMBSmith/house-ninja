//package com.houseninja.sec;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    public void configure(HttpSecurity security) throws Exception {
//        security.authorizeRequests().antMatchers("/").permitAll()
////            .anyRequest().authenticated()
//            .and()
//          .formLogin().loginPage("/login").permitAll().and().logout().permitAll();
//    }
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder authBuilder) throws Exception {
//        authBuilder.inMemoryAuthentication().withUser("user").password("ChangePassword1");
//    }
//}

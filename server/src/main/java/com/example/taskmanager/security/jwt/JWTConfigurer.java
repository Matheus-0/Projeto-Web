package com.example.taskmanager.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    @Autowired
    private JWTTokenProvider tokenProvider;

    public JWTConfigurer(JWTTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        JWTTokenFilter customFilter = new JWTTokenFilter(tokenProvider);

        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }

}

package com.example.taskmanager.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidJWTAuthenticationException extends AuthenticationException {

    public InvalidJWTAuthenticationException(String ex) {
        super(ex);
    }

}

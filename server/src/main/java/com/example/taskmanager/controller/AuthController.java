package com.example.taskmanager.controller;

import com.example.taskmanager.dto.UserAccountCredentialsDTO;
import com.example.taskmanager.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserAccountCredentialsDTO userAccountCredentialsDTO) {
        System.out.println(userAccountCredentialsDTO);

        return authService.login(userAccountCredentialsDTO);
    }

}

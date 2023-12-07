package com.example.taskmanager.controller;

import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        try {
            List<User> users = userService.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody @Valid UserRegistrationDTO userRegistrationDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
        }

        return userService.registerUser(userRegistrationDTO);
    }

}

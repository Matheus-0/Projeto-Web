package com.example.taskmanager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegistrationDTO {

    @NotNull
    @Email
    private String email;
    @NotEmpty
    private String password;

}

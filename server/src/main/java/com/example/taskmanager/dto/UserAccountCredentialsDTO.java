package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserAccountCredentialsDTO {

    @NotEmpty
    private String email;
    @NotEmpty
    private String password;

}

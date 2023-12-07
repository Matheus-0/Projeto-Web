package com.example.taskmanager.dto;

import com.example.taskmanager.constants.TaskStatusEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskDTO {

    @NotEmpty
    private String name;
    @NotNull
    private int duration;
    @NotNull
    private TaskStatusEnum status;
    @NotNull
    private LocalDate dueDate;
    @NotEmpty
    private String email;

}

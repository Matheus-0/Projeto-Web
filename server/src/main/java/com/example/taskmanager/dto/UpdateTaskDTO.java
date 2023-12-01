package com.example.taskmanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskDTO {

    private String name;
    private int duration;
    private LocalDate dueDate;
    private String category;
    private Long taskId;

}

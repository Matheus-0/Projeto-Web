package com.example.taskmanager.dto;

import com.example.taskmanager.constants.TaskStatusEnum;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskDTO {

    private String name;
    private int duration;
    private TaskStatusEnum status;
    private LocalDate dueDate;
    private Long taskId;

}

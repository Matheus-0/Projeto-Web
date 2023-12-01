package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.GetUserTasksDTO;
import com.example.taskmanager.dto.UpdateTaskDTO;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<String> createTask(@RequestBody CreateTaskDTO createTaskDTO) {
        return taskService.createTask(createTaskDTO);
    }

    @GetMapping
    public ResponseEntity getUserTasks(@RequestParam String email) {
        return taskService.getUserTasks(email);
    }

    @PutMapping
    public ResponseEntity updateTask(@RequestBody UpdateTaskDTO updateTaskDTO) {
        return taskService.updateTask(updateTaskDTO);
    }

}

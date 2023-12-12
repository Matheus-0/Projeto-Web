package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.UpdateTaskDTO;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<String> createTask(
            @RequestBody CreateTaskDTO createTaskDTO,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return taskService.createTask(createTaskDTO, userDetails);
    }

    @GetMapping
    public ResponseEntity getUserTasks(@RequestParam String email, @RequestParam(defaultValue = "", required = false) String name, @RequestParam(required = false) String dueDate) {
        return taskService.getUserTasks(email, name, dueDate);
    }

    @PutMapping
    public ResponseEntity updateTask(@RequestBody UpdateTaskDTO updateTaskDTO) {
        return taskService.updateTask(updateTaskDTO);
    }

    @DeleteMapping
    public ResponseEntity deleteTask(@RequestParam Long id) {
        return taskService.deleteTask(id);
    }

}

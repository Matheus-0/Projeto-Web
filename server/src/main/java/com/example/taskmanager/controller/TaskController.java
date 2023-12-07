package com.example.taskmanager.controller;

import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.GetUserTasksDTO;
import com.example.taskmanager.dto.UpdateTaskDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity getUserTasks(@RequestParam String email, @RequestParam(defaultValue = "", required = false) String name) {
        return taskService.getUserTasks(email, name);
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

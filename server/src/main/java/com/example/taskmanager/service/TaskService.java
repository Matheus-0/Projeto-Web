package com.example.taskmanager.service;

import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.GetUserTasksDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> createTask(CreateTaskDTO createTaskDTO) {
        try {
            User user = userRepository.findById(createTaskDTO.getUserId()).orElse(null);

            if (user == null) {
                return ResponseEntity.ok("Erro: Usuário não existe no sistema.");
            } else {
                Task task = new Task(
                        createTaskDTO.getName(),
                        createTaskDTO.getDuration(),
                        createTaskDTO.getDueDate(),
                        createTaskDTO.getCategory(),
                        user
                );

                repository.save(task);

                return ResponseEntity.ok("Tarefa criada com sucesso!");
            }
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado na criação da tarefa.");
        }
    }

    public ResponseEntity getUserTasks(String email) {
        try {
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return ResponseEntity.ok("Erro: Usuário não existe no sistema.");
            } else {
                ArrayList<Task> tasks = repository.findByUser(user).orElseThrow();

                return ResponseEntity.ok(tasks);
            }
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado ao buscar as tarefas do usuário.");
        }
    }

}

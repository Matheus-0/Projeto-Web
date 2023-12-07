package com.example.taskmanager.service;

import com.example.taskmanager.constants.TaskStatusEnum;
import com.example.taskmanager.dto.CreateTaskDTO;
import com.example.taskmanager.dto.UpdateTaskDTO;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> createTask(CreateTaskDTO createTaskDTO) {
        try {
            User user = userRepository.findByEmail(createTaskDTO.getEmail()).orElse(null);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: Usuário não existe no sistema.");
            } else {
                Task task = new Task(
                        createTaskDTO.getName(),
                        createTaskDTO.getDuration(),
                        createTaskDTO.getDueDate(),
                        createTaskDTO.getCategory(),
                        user,
                        TaskStatusEnum.PENDING
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

    public ResponseEntity getUserTasks(String email, String name) {
        try {
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: Usuário não existe no sistema.");
            } else {
                ArrayList<Task> tasks = repository.findTasksByUserIsAndNameContaining(user, name).orElseThrow();

                return ResponseEntity.ok(tasks);
            }
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado ao buscar as tarefas do usuário.");
        }
    }

    public ResponseEntity updateTask(UpdateTaskDTO updateTaskDTO) {
        try {
            Task task = repository.findById(updateTaskDTO.getTaskId()).orElse(null);

            if (task == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: Tarefa não existe no sistema.");
            } else {
                task.setName(updateTaskDTO.getName());
                task.setCategory(updateTaskDTO.getCategory());
                task.setDuration(updateTaskDTO.getDuration());
                task.setDueDate(updateTaskDTO.getDueDate());

                repository.save(task);

                return ResponseEntity.ok("Tarefa atualizada com sucesso!");
            }
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado na atualização da tarefa.");
        }
    }

    public ResponseEntity deleteTask(Long id) {
        try {
            repository.deleteById(id);

            return ResponseEntity.ok("Tarefa removida com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado ao remover a tarefa.");
        }
    }

}

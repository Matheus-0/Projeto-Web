package com.example.taskmanager.repository;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<ArrayList<Task>> findTasksByUserIsAndNameContaining(User user, String name);
    Optional<ArrayList<Task>> findTasksByUserIsAndNameContainingAndDueDateIs(User user, String name, LocalDate dueDate);

}

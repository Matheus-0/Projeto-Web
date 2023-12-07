package com.example.taskmanager.model;

import com.example.taskmanager.constants.TaskStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int duration;
    private LocalDate dueDate;
    @CreationTimestamp
    private LocalDate createdDate;
    @Enumerated(EnumType.STRING)
    private TaskStatusEnum status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Task() {
    }

    public Task(String name, int duration, LocalDate dueDate, User user, TaskStatusEnum status) {
        this.name = name;
        this.duration = duration;
        this.dueDate = dueDate;
        this.user = user;
        this.status = status;
    }

}

package com.example.taskmanager.constants;

public enum TaskStatusEnum {
    PENDING("Pendente"),
    IN_PROGRESS("Em progresso"),
    FINISHED("Finalizada");

    private final String description;

    TaskStatusEnum(String description) {
        this.description = description;
    }
}

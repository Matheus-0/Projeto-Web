package com.example.taskmanager.constants;

import lombok.Getter;

@Getter
public enum UserTypesEnum {
    USER("USER"),
    ADMIN("ADMIN");

    private final String description;

    UserTypesEnum(String description) {
        this.description = description;
    }
}

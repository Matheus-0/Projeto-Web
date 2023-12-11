package com.example.taskmanager.repository;

import com.example.taskmanager.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Optional<Permission> findPermissionByDescription(String description);

}

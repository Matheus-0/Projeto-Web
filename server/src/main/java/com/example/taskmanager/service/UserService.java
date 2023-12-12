package com.example.taskmanager.service;

import com.example.taskmanager.constants.UserTypesEnum;
import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.model.Permission;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.PermissionRepository;
import com.example.taskmanager.repository.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PermissionRepository permissionRepository;

    public List<User> findAll() {
        try {
            return this.userRepository.findAll();
        } catch (Exception e) {
            throw new Error("Erro ao buscar usuários.");
        }
    }

    public ResponseEntity<String> registerUser(UserRegistrationDTO userRegistrationDTO) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        try {
            if (userRepository.findByEmail(userRegistrationDTO.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: Email já registrado no sistema.");
            }

            User user = new User();

            user.setEmail(userRegistrationDTO.getEmail());
            user.setPassword(encoder.encode(userRegistrationDTO.getPassword()));

            Permission commonUserPermission = permissionRepository.findPermissionByDescription("COMMON_USER").orElse(null);

            if (commonUserPermission == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: ID de permissão não encontrado!");
            }

            user.setPermissions(List.of(commonUserPermission));

            userRepository.save(user);

            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado na criação de usuário.");
        }
    }

    public ResponseEntity deleteUser(Long id) {
        try {
            User existingUser = userRepository.findById(id).orElse(null);

            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erro: Usuário não existe.");
            }

            for (var authority : existingUser.getAuthorities()) {
                if (authority.getAuthority().equals(UserTypesEnum.ADMIN.getDescription())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("Erro: Não é permitido apagar um usuário admin.");
                }
            }

            userRepository.deleteById(id);

            return ResponseEntity.ok("Usuário removido com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado ao remover usuário.");
        }
    }

}

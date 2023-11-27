package com.example.taskmanager.service;

import com.example.taskmanager.dto.UserRegistrationDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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

            userRepository.save(user);

            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado na criação de usuário.");
        }
    }

}

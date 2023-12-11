package com.example.taskmanager.service;

import com.example.taskmanager.dto.TokenDTO;
import com.example.taskmanager.dto.UserAccountCredentialsDTO;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.security.jwt.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private UserRepository repository;

    public ResponseEntity login(UserAccountCredentialsDTO userAccountCredentialsDTO) {
        try {
            String username = userAccountCredentialsDTO.getEmail();
            String password = userAccountCredentialsDTO.getPassword();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            User user = repository.findByEmail(username).orElse(null);

            TokenDTO tokenResponse;

            if (user != null) {
                tokenResponse = tokenProvider.createAccessToken(username, user.getRoles());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erro: Usuário não encontrado no sistema.");
            }

            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro: Algo deu errado no login de usuário.");
        }
    }

}

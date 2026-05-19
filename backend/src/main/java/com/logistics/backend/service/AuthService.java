package com.logistics.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.logistics.backend.model.Role;
import com.logistics.backend.model.User;
import com.logistics.backend.repository.UserRepository;
import com.logistics.backend.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔹 REGISTER (only USER)
    public User register(User user) {

        try {
            System.out.println("Incoming user: " + user);

            if (user.getEmail() == null) {
                throw new RuntimeException("EMAIL IS NULL");
            }

            if (user.getPassword() == null) {
                throw new RuntimeException("PASSWORD IS NULL");
            }

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new RuntimeException("Email already registered");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(Role.ROLE_USER);

            return userRepository.save(user);

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 THIS IS CRITICAL
            throw e;
        }
    }

    // 🔹 LOGIN
    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return response;
    }
}

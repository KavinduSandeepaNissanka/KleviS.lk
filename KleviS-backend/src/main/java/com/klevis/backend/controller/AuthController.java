package com.klevis.backend.controller;

import com.klevis.backend.dto.AuthRequest;
import com.klevis.backend.dto.AuthResponse;
import com.klevis.backend.model.User;
import com.klevis.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Basic password check (in production, use PasswordEncoder)
            if (user.getPassword().equals(request.getPassword())) {
                // Generate a simple mock token for development
                String mockToken = "mock-jwt-token-" + user.getId();
                return ResponseEntity.ok(new AuthResponse(mockToken, user));
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        // Default to USER role if none provided
        if (newUser.getRole() == null || newUser.getRole().isEmpty()) {
            newUser.setRole("ROLE_USER");
        }
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/seed-admin")
    public ResponseEntity<?> seedAdmin() {
        if (userRepository.findByEmail("admin@klevis.lk").isEmpty()) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@klevis.lk");
            admin.setPassword("admin123"); // plain text for dev purposes
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            return ResponseEntity.ok("Admin seeded successfully");
        }
        return ResponseEntity.ok("Admin already exists");
    }
}

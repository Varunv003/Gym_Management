package com.varun.gym.gymMember.security.controller;

import com.varun.gym.gymMember.security.dto.LoginRequest;
import com.varun.gym.gymMember.security.service.AuthService;
import com.varun.gym.gymMember.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginRequest request) {
        return authService.authenticate(request.getEmail(), request.getPassword());
    }

}


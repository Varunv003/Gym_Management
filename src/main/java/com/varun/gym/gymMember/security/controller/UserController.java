package com.varun.gym.gymMember.security.controller;

import com.varun.gym.gymMember.security.entity.User;
import com.varun.gym.gymMember.security.service.UserService;
import com.varun.gym.gymMember.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/saveUser")
    public ApiResponse saveUser(@RequestBody User user) {return userService.save(user);}

    @PutMapping("/updateUser")
    public ApiResponse updateUser(@RequestBody User user) {return userService.update(user);}

    @DeleteMapping("/deleteById/{id}")
    public ApiResponse deleteById(@PathVariable Long id) {
        return userService.deleteById(id);
    }
}


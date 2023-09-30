package com.colossal.foodies_backend.controller;

import com.colossal.foodies_backend.model.User;
import com.colossal.foodies_backend.security.CurrentUser;
import com.colossal.foodies_backend.security.UserPrincipal;
import com.colossal.foodies_backend.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return this.userService.getByUserId(userPrincipal.getId());
    }

    @GetMapping("/user/all")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @DeleteMapping("/user/delete/{id}")
    public Map<String, String> deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }

    @PutMapping("/user/edit/{id}")
    public User editUserById(@PathVariable String id, @RequestBody User user) {
        return userService.editUserById(id, user);
    }


}

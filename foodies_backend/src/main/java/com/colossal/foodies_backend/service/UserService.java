package com.colossal.foodies_backend.service;


import java.util.*;

import com.colossal.foodies_backend.model.User;

public interface UserService {

    User getByUserId(String id);

    List<User> getAllUsers();

    Map<String, String> deleteUserById(String id);

    User editUserById(String id, User user);
}

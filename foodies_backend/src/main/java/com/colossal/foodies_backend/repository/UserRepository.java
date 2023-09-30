package com.colossal.foodies_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.colossal.foodies_backend.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
    
}

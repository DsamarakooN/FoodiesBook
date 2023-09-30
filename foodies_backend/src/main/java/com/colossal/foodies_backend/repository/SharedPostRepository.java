package com.colossal.foodies_backend.repository;

import com.colossal.foodies_backend.model.SharedPost;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SharedPostRepository extends MongoRepository<SharedPost, String> {
}

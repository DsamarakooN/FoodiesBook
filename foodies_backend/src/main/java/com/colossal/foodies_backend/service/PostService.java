package com.colossal.foodies_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colossal.foodies_backend.model.Post;
import com.colossal.foodies_backend.repository.PostRepository;

// PostService interface defines the methods for managing Post objects
public interface PostService {

    // Retrieve all posts from the repository
    List<Post> getAllPosts();

    // Retrieve a post by its ID from the repository
    Optional<Post> getPostById(String postId);

    // Create a new post and save it to the repository
    Post createPost(Post post);

    // Update an existing post in the repository
    Post updatePost(Post post);

    // Delete a post by its ID from the repository
    void deletePostById(String postId);
}

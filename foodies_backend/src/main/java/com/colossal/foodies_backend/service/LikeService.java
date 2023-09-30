package com.colossal.foodies_backend.service;


import com.colossal.foodies_backend.model.Like;

public interface LikeService {
    void addLike(Like like);

    void removeLikeById(String likeId);
}

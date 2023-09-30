package com.colossal.foodies_backend.service;

import com.colossal.foodies_backend.model.Like;
import com.colossal.foodies_backend.repository.LikeRepository;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;

    public LikeServiceImpl(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Override
    public void addLike(Like like) {
        likeRepository.save(like);
    }

    @Override
    public void removeLikeById(String likeId) {
        likeRepository.deleteById(likeId);
    }
}

package com.colossal.foodies_backend.service;

import com.colossal.foodies_backend.model.Comment;

import java.util.List;


public interface CommentService {

    List<Comment> getCommentsByPostId(String postId);

    List<Comment> getCommentsByUserId(String userId);

    Comment addComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(String id, String userId);
}

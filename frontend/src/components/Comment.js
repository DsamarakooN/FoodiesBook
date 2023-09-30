/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { deleteComment } from "../util/APIUtils";
import CommentBox from "./CommentBox";
import images from "../constants/images";

const Comment = ({ comment, ...rest }) => {
  const [commentState, setCommentState] = useState(comment);
  const [editComment, setEditComment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteComment = async () => {
    try {
      const response = await deleteComment(comment.id, rest.currentUser.id);
      if (response) {
        alert("Comment successfully deleted");
        rest.updateComment(comment.id);
      }
    } catch (error) {
      alert("Delete operation failed");
    }
  };

  const handleEditComment = () => {
    setEditComment(true);
  };

  const updateEditedComment = com => {
    setCommentState(com);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const isOwner = comment.userId === rest.currentUser.id;

  return editComment ? (
    <CommentBox 
      comment={commentState}
      {...rest}
      editComment
      setEditComment={setEditComment}
      updateComment={updateEditedComment}
    />
  ) : (
    <ul className="divide-y divide-black-700 dark:divide-black-700" id="commentbox">
      <li className="p-2 sm:p-2 ">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={
                commentState.commentedUser?.imageUrl ||
                images.Profile
              }
              alt={commentState.commentedUser?.name || "User"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-left font-bold text-gray-800 truncate dark:text-gray-800">
              {commentState.commentedUser?.name || "User"}
            </p>
            <p className="text-sm text-left text-black-200 dark:text-black-200">
              {commentState.text}
            </p>
          </div>

          {isOwner && (
            <div className="inline-flex items-right text-base font-semibold text-gray-900">
              <button style={{marginRight:'10px', color:'black'}} onClick={togglePopup}>...</button>
              {showPopup ? (
                <div className="popup">
              <div
                type="button"
                onClick={handleDeleteComment}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <img src={images.Delete} style={{width:'20px'}} />
              </div>
              
              <div
                type="button"
                onClick={handleEditComment}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <img src={images.Edit} style={{width:'20px',}} />
              </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default Comment;

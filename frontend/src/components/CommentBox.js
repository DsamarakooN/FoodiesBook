import React, { useState } from "react";
import { editComment, postComment } from "../util/APIUtils";
import Like from "./Like";
import Share from "./Share";
import images from '../constants/images';

const CommentBox = props => {
  const [comment, setComment] = useState(props.comment?.text || "");

  const handlePostComment = async () => {
    if (!comment) return;

    if (props.editComment) {
      handleEditComment();
      return;
    }

    try {
      const response = await postComment({
        postId: props.id,
        text: comment,
        userId: props.currentUser.id
      });
      if (response.id) {
        // alert("Comment posted", { type: "success" });
        setComment("");
        props.updateComment(response);
      }
    } catch (error) {
      alert("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleEditComment = async () => {
    try {
      console.log(comment);
      const response = await editComment(props.comment.id, {
        ...props.comment,
        text: comment
      });
      if (response) {
        // alert("Comment successfully updated", { type: "success" });
        props.setEditComment(false);
        props.updateComment(response);
      }
    } catch (error) {
      alert("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleComment = event => {
    setComment(event.target.value);
  };

  return (
      <div className="flex items-center px-3 py-2 rounded-b-lg bg-white-900" id="comment">
        {!props.editComment && (
          <>
            <Like {...props} />

            {!props.shared && <Share post={props} />}
          </>
        )}

        <textarea
          id="chat"
          rows="1"
          onChange={handleComment}
          value={comment}
          className="block mx-4 p-2.5 w-full text-sm text-black-200 bg-white-800 rounded-lg border border-gray-500  dark:bg-white-800 dark:border-gray-600 dark:placeholder-gray-400 "
          placeholder="comment your idea..."
        ></textarea>
        <button
          onClick={handlePostComment}
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-300"
        >
          <img src={images.Post} style={{width:'50px'}} />
        </button>
      </div>
  );
};

export default CommentBox;

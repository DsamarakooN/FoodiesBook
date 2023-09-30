import React, { useState } from "react";
import { disLikePost, getPostById, likePost } from "../util/APIUtils";
import images from '../constants/images';

const Like = props => {
  const [liked, setLiked] = useState(
    props.likes.filter(like => like.userId === props.currentUser.id).length > 0
  );
  const [likeCount, setLikeCount] = useState(props.likes.length);

  const handleLike = async () => {
    // like
    try {
      await likePost({
        postId: props.id,
        userId: props.currentUser.id
      });
      setLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    } catch (error) {
      alert("Oops! something went wrong.", { type: "error" });
    }
  };

  const handleDislike = async () => {
    try {
      const post = await getPostById(props.id);
      const like = post.likes.filter(
        like => like.userId === props.currentUser.id
      )[0];

      await disLikePost({
        likeId: like.id
      });
      setLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } catch (error) {
      console.log(error);
      alert("Oops! something went wrong.", { type: "error" });
    }
  };

  return (
    <>
      {!liked ? (
        <div
          type="button"
          onClick={handleLike}
          className={
            "inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-gray-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          }
        >
          <div className="pr-2 dark:text-blue-500 dark:hover:text-blue-500">{likeCount}</div>
          <img src={images.Like} style={{width:'25px',}} />
        </div>
      ) : (
        <div
          type="button"
          onClick={handleDislike}
          className={
            "inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-white-600 dark:hover:bg-white-600 dark:text-blue-500 dark:hover:text-blue-500"
          }
        >
          <div className="pr-2 dark:text-blue-500 dark:hover:text-blue-500">{likeCount}</div>
          <img src={images.LikeAct} style={{width:'25px',}} />

        </div>
      )}
    </>
  );
};

export default Like;

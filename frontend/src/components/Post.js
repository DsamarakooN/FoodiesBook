/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { deletePost } from "../util/APIUtils";
import PostEditModal from "./PostEditModal";
import images from "../constants/images";

const Post = props => {
  const [post, setPost] = useState(props);
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { shared } = props;

  const updateComment = comment => {
    setPost({ ...post, comments: [comment, ...post.comments] });
  };

  const updateDeletedComment = id => {
    setPost({
      ...post,
      comments: post.comments.filter(comment => comment.id !== id)
    });
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(post.id);
      if (response) {
        alert("Post deleted successfully", { type: "success" });
        props.refetchPosts();
      }
    } catch (error) {
      alert("Post deleted successfully", { type: "success" } );
      props.refetchPosts();
    }
  };

  const handleEditPost = () => {
    // edit post
    setOpen(true);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const isOwner = post.userId === props.currentUser.id;

  return (
    <div id="postbox" className="editor mx-auto my-6 w-10/12 flex flex-col border border-gray-700 max-w-2xl">
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0"></div>
          
          {!shared && isOwner && (
            
            <div className="inline-flex items-right text-base font-semibold text-gray-200">
              <button style={{marginRight:'10px', color:'black'}} onClick={togglePopup}>...</button>
              {showPopup ? (
                <div className="popup">
                  <div
                type="button"
                onClick={handleDeletePost}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
               <img src={images.Delete} style={{width:'20px',}} />
              </div>
              <div
                type="button"
                onClick={handleEditPost}
                className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <img src={images.Edit} style={{width:'20px',}} />
              </div>
                </div>
                
              ) : null}
            </div>
            
          )}
        </div>

        <div className="p-2 sm:p-6 ml-5 mr-5">
          <p className="font-sans font-semibold hover:font-bold mt-2 text-start text-sm/relaxed text-black-200">
            {props.description}
          </p>
          <hr />
        </div>

        <div className="container p-4 mx-auto" >
          <div className="-m-1 flex flex-wrap md:-m-2" >
            {post.imageUrl?.length > 0 &&
              post.imageUrl.map((image, i) => (
                <div key={i} className={"flex w-1/2 flex-wrap"} >
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={post.title}
                      src={image}
                      className="block h-full w-full rounded-lg object-cover object-center"
                    />
                    
                  </div>
                </div>
              ))}
          </div>
        </div>

        

        <div className="bg-black border-t border-gray-700">
          <CommentBox
            {...props}
            shared={shared}
            updateComment={updateComment}
          />
        </div>
        <div className="bg-black border-t  border-gray-700">
          {post.comments.length > 0 &&
            post.comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                updateComment={updateDeletedComment}
                {...props}
              />
            ))}
        </div>
      </article>

      {open && (
        <PostEditModal
          open={open}
          setOpen={setOpen}
          post={post}
          refetchPosts={props.refetchPosts}
        />
      )}
    </div>
  );
};

export default Post;

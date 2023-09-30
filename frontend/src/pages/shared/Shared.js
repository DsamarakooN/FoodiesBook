import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../../components/Post";
import { deleteSharedPost, getSharedPosts } from "../../util/APIUtils";
import PostEditModal from "../../components/PostEditModal";
import images from "../../constants/images";
const Shared = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchAllPost = async () => {
    try {
      const response = await getSharedPosts();
      setPosts(response.reverse());
    } catch (error) {
      alert("Oops something went wrong!", { type: "error" });
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleDeletePost = id => async () => {
    try {
      const response = await deleteSharedPost(id);
      if (response) {
        alert("Post deleted successfully");
        fetchAllPost();
      }
    } catch (error) {
      alert("Oops, Something went wrong");
    }
  };

  const handleEditPost = () => {
    // edit post
    setOpen(true);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="home-container">
      <div className="container">
      <h1 className="text-black-600" style={{fontSize:'2vw', color:'blue', fontWeight:800, marginBottom:'2vw'}}>My shared Post</h1>
      <div >
        {posts.map(post => (
          <center>
          <div key={post.id} className="p-4 text-lg text-black-600 divide"  style={{backgroundColor:'#ffffff56', width:'50vw', alignItems:'center', borderRadius:'2vw', marginBottom:'2vw'}} >
            {post.description}
            <button style={{marginRight:'10px', color:'black', float:'right'}} onClick={togglePopup}>...</button>
            {showPopup ? (
            <div className="inline-flex items-right text-base font-semibold text-gray-900" style={{float:'right'}}>
              
              <div
                type="button"
                onClick={handleDeletePost(post.id)}
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

            
            <Post
              currentUser={currentUser}
              refetchPosts={fetchAllPost}
              shared
              {...post.sharedPost}
            />

            {open && (
              <PostEditModal
                open={open}
                setOpen={setOpen}
                post={post}
                refetchPosts={fetchAllPost}
                shared
              />
            )}
          </div>
          </center>
        ))}</div>
      </div>
    </div>
  );
};

export default Shared;

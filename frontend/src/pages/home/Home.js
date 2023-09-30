import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../../components/Post";
import { getAllPost } from "../../util/APIUtils";
import CreatePost from "../../components/CreatePost";

const Home = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPost();
  }, []);

  const fetchAllPost = async () => {
    try {
      const response = await getAllPost();
      setPosts(response.reverse());
    } catch (error) {
      alert("Oops something went wrong!", { type: "error" });
    }
  };

  return (
    <div className="home-container">
      <div className="container">
        <CreatePost currentUser={currentUser} refetchPosts={fetchAllPost} />

        {posts.map(post => (
          <Post
            key={post.id}
            currentUser={currentUser}
            refetchPosts={fetchAllPost}
            {...post}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

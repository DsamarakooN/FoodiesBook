/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./Profile.css";
import CreatePost from "../../../components/CreatePost";
import Post from "../../../components/Post";
import {
  deleteProfileById,
  getAllPost,
  getCurrentUser
} from "../../../util/APIUtils";
import { ACCESS_TOKEN } from "../../../constants";
import { useNavigate } from "react-router";
import EditUserModal from "../../../components/EditUserModal";
import images from "../../../constants/images";

const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(currentUser);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const refetchUser = async () => {
    try {
      const response = await getCurrentUser();
      if (!response) return;

      setUser(response);
    } catch (error) {
      alert("Oops something went wrong!", { type: "error" });
    }
  };

  const fetchAllPost = useCallback(async () => {
    try {
      const response = await getAllPost();
      if (!response.length) return;

      setPosts(response.reverse().filter(post => post.userId === user.id));
    } catch (error) {
      alert("Oops something went wrong!", { type: "error" });
    }
  }, [user.id]);

  useEffect(() => {
    fetchAllPost();
  }, [fetchAllPost]);

  const editProfile = async () => {
    setOpen(true);
  };

  const deleteProfile = async () => {
    try {
      const response = await deleteProfileById(user.id);
      if (response != null) {
        alert("profile remove successfully", { type: "success" });
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = "/login";
      }
    } catch (error) {
      alert("Oops something went wrong!", { type: "error" });
    }
  };

  const handleSharedPosts = () => {
    navigate("/shared");
  };

  return (
    <>
      <header aria-label="Page Header" className="bg-white-800">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col items-center justify-center">
            <a href="#" className="block shrink-0">
              <span className="sr-only">Profile</span>
              <img
                alt={user.name}
                src={user.imageUrl}
                className="h-100 w-100 mb-2 rounded-full object-cover"
              />
            </a>
            <h1 className="text-2xl font-bold text-black-100 sm:text-3xl">
            Welcome back !. We're glad to see {user.name} again! 
            </h1>

            <p className="mt-1.5 text-sm text-black-200">{user.email}</p>
          </div>

          <div className="flex mt-4 selection:items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={handleSharedPosts}
                  className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black-100 bg-white-700 ml-auto"
                >
                  <img src={images.Share}/>
                  Shared Posts
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={editProfile}
                  className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black-100 bg-white-600 ml-auto"
                >
                  <img src={images.Edit}/>
                  Edit Profile
                </div>
              </div>

              <div
                onClick={deleteProfile}
                className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black-100 bg-white-700 ml-auto"
              >
                <img src={images.Delete}/>
                Delete Profile
              </div>
            </div>
          </div>
        </div>
        <div className="count ml-auto">
          <div className="buttons flex"></div>
        </div>
      </header>

      <div className="home-container">
        <div className="container">
          <CreatePost currentUser={user} refetchPosts={fetchAllPost} />

          {posts.map(post => (
            <Post
              key={post.id}
              currentUser={user}
              refetchPosts={fetchAllPost}
              {...post}
            />
          ))}
        </div>
      </div>

      <EditUserModal
        open={open}
        setOpen={setOpen}
        currentUser={user}
        refetchUser={refetchUser}
      />
    </>
  );
};

export default Profile;

import React, { useReducer } from "react";
import { createPost } from "../util/APIUtils";
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreatePost = ({ currentUser, refetchPosts }) => {
  const initialState = {
    description: "",
    imageUrl: [],
    userId: currentUser.id,
    progress: 0
  };

  const [post, setPost] = useReducer((prevState, newState) => {
    return { ...prevState, ...newState };
  }, initialState);

  const handleDescription = event => {
    setPost({ description: event.target.value });
  };

  const submitPost = async () => {
    if (!post.description) {
      alert("Post description is mandatory", { type: "error" });
      return;
    }
    if (post.imageUrl.length === 0) {
      alert("Please attach atleast 1 image", { type: "error" });
      return;
    }

    try {
      const response = await createPost(post);
      if (response) {
        alert("Post successfully created!", { type: "success" });
        setPost({ ...initialState });
        refetchPosts();
      }
    } catch (error) {
      console.log(error);
      alert("Oops! Something went wrong.", { type: "error" });
    }
  };

  const isValidFileType = (file) => {
    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "avif"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };


  const handleImageChange = async event => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (files.length > 4) {
      alert("Please select up to 4 images");
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(file => !isValidFileType(file));
    if (invalidFiles.length > 0) {
      alert("Invalid file type(s). Please select png, jpg, SVG, or avif images.");
      return;
    }

    try {
      const imagePromises = files.map(async (file) => {
        const fileName = file.name;
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setPost({ progress: progress.toFixed(2) });
            },
            (error) => {
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
        return downloadURL;
      });

      Promise.all(imagePromises)
        .then((downloadURLs) => {
          setPost({ imageUrl: downloadURLs });
        })
        .catch(error => {
          alert("Error uploading images:", { type: "error" });
        });
    } catch (error) {
      console.error(error);
      alert("Error uploading images:", { type: "error" });
    }
  };

  return (
    <>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border rounded-lg dark:bg-white-200 border-gray-700 p-4 shadow-lg max-w-2xl">
        <textarea
          onChange={handleDescription}
          value={post.description}
          className="description bg-white-800 rounded-lg sec p-3 h-50 border text-black border-gray-700 outline-none"
          spellCheck="false"
          placeholder="Describe everything about your recipe here"
        ></textarea>

        <input
          id="attachments"
          value=""
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="hidden"
        />


        {/* <div className="progress w-full mt-2">
          <div
            className="bg-indigo-500 max-w-full top-0 left-0 py-1 rounded text-white text-center text-xs"
            style={{ width: `\${post.progress}%` }}
          >
            
          </div>
        </div> */}


        {/* <div class="relative h-full w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div 
            class="absolute inset-0 bg-blue-600 text-xs font-medium max-w-full  text-blue-100 text-center p-0.5 leading-none rounded-full" 
            style={{ width: `\\${post.progress}%` , animation: `progress 0.4s ease-in-out forwards` } }
            // style={{ width: `30%` } }
            > 
            {post.progress}%
            </div>
        </div> */}
        {post.progress > 0 && post.progress < 100 && (

          <div className='h-4 w-full rounded-full bg-gray-300 mt-3'>
            <div
              style={{ width: `${post.progress}%` }}
              className={`h-full rounded-full ${post.progress} bg-indigo-500 text-white `}>
              {post.progress}%
            </div>
          </div>
        )}



        <div className="flex">
          {post.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-40 p-2"
              alt={`Selected pic ${index + 1}`}
            />
          ))}
        </div>

        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="attachments">
            <div
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </div>
          </label>
          <div className="count ml-auto">
            <div className="buttons flex">
              <div
                onClick={submitPost}
                className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-300 bg-indigo-500 ml-auto"
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

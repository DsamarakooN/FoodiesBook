import React, { useState } from "react";
import SharePostModal from "./SharePostModal";
import images from '../constants/images';

const Share = ({ post }) => {
  const [open, setOpen] = useState(false);

  const handleSharePost = () => {
    setOpen(true);
  };

  return (
    <div
      type="button"
      onClick={handleSharePost}
      className="inline-flex justify-center p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-200 hover:bg-White-600 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    >
      <img src={images.Share} style={{width:'30px',}} />
      <SharePostModal open={open} setOpen={setOpen} post={post} />
    </div>
  );
};

export default Share;

import React from "react";
import images from "../constants/images";

export default function LoadingIndicator(props) {
  return (
    <div
      className="loading-indicator"
      style={{ display: "block", textAlign: "center", marginTop: "10vw", alignItems: "center" }}
    ><center>
      <img src={images.Loading}/>
      </center>
    </div>
  );
}

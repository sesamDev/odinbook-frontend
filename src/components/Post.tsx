import "../styles/Post.css";

import { PostData } from "../types";
import React from "react";

interface PostDataProp {
  post: PostData;
}

const fbColor = "rgb(57 117 234)";

function Post(props: PostDataProp) {
  const { post } = props;
  return (
    <div className="post-card">
      <div className="post-profile">
        <img src={""} alt="profile" />
        <div className="profile-name-date-wrapper">
          <p className="profile-name">{`${post.author.first_name} ${post.author.last_name}`}</p>
          <p className="profile-date">{`${post.timestamp}`}</p>
        </div>
      </div>
      <div className="post-text">{post.text}</div>
      <div className="post-img">
        {/* TODO: Add image */}
        <img src={""} alt="" />
      </div>
      <div className="post-likes">
        <svg width="24px" height="24px" viewBox="0 0 24 24">
          <path
            fill={fbColor}
            d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
          />
        </svg>
        <p>{post.likes}</p>
      </div>
      <div className="post-buttons">
        <button>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>
        </button>
        <button>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Post;

import React from "react";
import { User } from "../data/faker";

interface UserProp {
  user: User;
}

function Post(props: UserProp) {
  const { user } = props;

  return (
    <div>
      <div className="post-profile">
        <img src={user.avatar} alt="profile" />
        <p className="profile-name">{user.fullname}</p>
      </div>
      <div className="post-text">Here is text!!!</div>
      <div className="post-img">IMG</div>
      <div className="post-buttons">
        <button>Like</button>
        <button>Comment</button>
      </div>
    </div>
  );
}

export default Post;

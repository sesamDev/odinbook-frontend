import React from "react";
import { User } from "../data/faker";

interface UserProp {
  user: User;
}

function FriendInfo(props: UserProp) {
  const { user } = props;
  return (
    <div className="friend-card">
      <div className="friend-info">
        <img src={user.avatar} alt="Friend" />
        <p>{user.fullname}</p>
      </div>
    </div>
  );
}

export default FriendInfo;

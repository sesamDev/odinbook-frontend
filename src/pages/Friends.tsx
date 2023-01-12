import "../styles/Friends.css";

import FriendInfo from "../components/FriendInfo";
import React from "react";
import { USERS } from "../data/faker";

function Friends() {
  function countFriends(): number {
    return USERS.length;
  }
  return (
    <div className="friend-card">
      <div className="num-of-friends">{countFriends()} friends</div>
      {USERS?.map((u) => {
        return <FriendInfo key={u.userId} user={u} />;
      })}
    </div>
  );
}

export default Friends;

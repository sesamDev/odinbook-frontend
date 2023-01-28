import "../styles/Friends.css";

import FriendInfo from "../components/FriendInfo";
import React from "react";
import { UserProp } from "../App";

//TODO: Implement friend request functionallity
function Friends(props: UserProp) {
  const { user } = props;
  function countFriends(): number | undefined {
    return user?.friends.length;
  }
  return (
    <div className="friend-card">
      <div className="num-of-friends">{countFriends()} friends</div>
      {user?.friends.map((u) => {
        return <FriendInfo key={u._id} user={u} />;
      })}
    </div>
  );
}

export default Friends;

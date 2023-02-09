import "../styles/Friends.css";

import React, { useEffect, useState } from "react";
import { UserProp, fbColor } from "../App";

import FriendInfo from "../components/FriendInfo";
import FriendRequest from "../components/FriendRequest";
import { getJwtToken } from "../auth";

//TODO: Implement friend request functionallity
function Friends(props: UserProp) {
  const { user } = props;
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>();
  function countFriends(): number | undefined {
    return user?.friends.length;
  }

  useEffect(() => {
    getFriendRequests(user?._id).then((r) => setFriendRequests(r));
  }, []);
  return (
    <div className="friend-card">
      <h2 style={{ color: fbColor }} className="requests">
        Friend requests
      </h2>
      {friendRequests?.map((r) => {
        return <FriendRequest request={r} key={r._id} />;
      })}
      <div className="num-of-friends">{countFriends()} friends</div>
      {user?.friends.map((u) => {
        return <FriendInfo key={u._id} user={u} />;
      })}
    </div>
  );
}

type FriendRequestType = {
  _id: string;
  sender: {
    first_name: string;
    last_name: string;
    _id: string;
  };
  reciever: string;
};
export default Friends;

async function getFriendRequests(_id: string | undefined): Promise<FriendRequestType[] | undefined> {
  if (_id === undefined) return;

  const token = getJwtToken();
  const response = await fetch(import.meta.env.VITE_API_URL + "request/get/" + _id, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });

  return response.json();
}

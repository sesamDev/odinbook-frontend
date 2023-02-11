import "../styles/Friends.css";

import React, { useEffect, useState } from "react";
import { UserProp, fbColor } from "../App";

import FriendInfo from "../components/FriendInfo";
import FriendRequest from "../components/FriendRequest";
import { User } from "../types";
import { getJwtToken } from "../auth";

type FriendRequestType = {
  _id: string;
  sender: {
    first_name: string;
    last_name: string;
    _id: string;
  };
  reciever: string;
};

type FriendsType = User;

//TODO: Implement friend request functionallity
function Friends(props: UserProp) {
  const { user } = props;
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>();
  const [friends, setFriends] = useState<FriendsType[]>();
  console.log(friendRequests);

  async function getFriendRequests(_id: string): Promise<void> {
    const token = getJwtToken();
    const response = await fetch(import.meta.env.VITE_API_URL + "request/get/" + _id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });

    const friendRequests = response.json();
    friendRequests.then((req) => setFriendRequests(req));
  }

  async function getFriends(): Promise<void> {
    const token = getJwtToken();
    const response = await fetch(import.meta.env.VITE_API_URL + "user/friends", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    });

    const friends = response.json();
    friends.then((f) => setFriends(f));
  }

  async function refetchAll(_id: string) {
    const newList = friendRequests?.filter((friend) => friend.sender._id !== _id);
    setFriendRequests(newList);
    await getFriends();
  }

  useEffect(() => {
    getFriendRequests(user._id);
  }, []);

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="friend-card">
      <h2 style={{ color: fbColor }} className="requests">
        Friend requests
      </h2>
      {friendRequests?.map((r) => {
        return <FriendRequest refetch={refetchAll} request={r} key={r._id} />;
      })}
      <div className="num-of-friends">{friends?.length} friends</div>
      {friends?.map((u) => {
        return <FriendInfo key={u._id} user={u} />;
      })}
    </div>
  );
}

export default Friends;

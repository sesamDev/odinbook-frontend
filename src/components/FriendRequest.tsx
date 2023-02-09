import React from "react";
import { getJwtToken } from "../auth";

interface IfriendRequest {
  request: {
    _id: string;
    sender: {
      _id: string;
      first_name: string;
      last_name: string;
    };
    reciever: string;
  };
}

function FriendRequest(props: IfriendRequest) {
  const { sender, reciever } = props.request;
  return (
    <div className="friend-request">
      <img src="/" alt="avatar" />
      <p>{sender.first_name + " " + sender.last_name}</p>
      <div>
        <button className="friend-request-button" type="button" onClick={() => acceptRequest(sender._id)}>
          Accept
        </button>
        <button className="friend-request-button" type="button" onClick={() => declineRequest(props.request._id)}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default FriendRequest;

async function acceptRequest(senderId: string): Promise<void> {
  //add sender id to currentuser friendlist
  const token = getJwtToken();
  fetch(import.meta.env.VITE_API_URL + "request/accept/" + senderId, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
}

async function declineRequest(requestId: string): Promise<void> {
  // delete request
  // const token = getJwtToken();
  // fetch(import.meta.env.VITE_API_URL + "request/decline/" + requestId, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-type": "application/json",
  //     Authorization: `Bearer ${token}`, // notice the Bearer before your token
  //   },
  // });
}

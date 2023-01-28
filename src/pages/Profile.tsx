import "../styles/Profile.css";

import React from "react";
import { USERS } from "../data/faker";
import { UserProp } from "../App";

//TODO: Implement Edit profile
function Profile(props: UserProp) {
  const { user } = props;
  return (
    <div className="app-profile">
      <img className="profile-img" src={USERS[0].avatar} alt="profile" />
      <div className="profile-name">{`${props?.user?.first_name} ${props?.user?.last_name}`}</div>
      <button>Edit profile</button>
      <div>
        <strong>Friends</strong>
        <p>{user?.friends.length}</p>
      </div>
      <div className="profile-friends">
        {user?.friends.map((u) => {
          return (
            <div className="friend-container" key={u._id}>
              <img src={u.avatar} alt="" className="friend-img" />
              <div className="friend-name">
                <strong>{`${u.first_name} ${u.last_name}`}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

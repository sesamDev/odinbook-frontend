import "../styles/Profile.css";

import React from "react";
import { USERS } from "../data/faker";

function Profile() {
  return (
    <div className="app-profile">
      <img className="profile-img" src={USERS[0].avatar} alt="profile" />
      <div className="profile-name">{USERS[0].fullname}</div>
      <button>Edit profile</button>
      <div>
        <strong>Friends</strong>
        <p>10 friends</p>
      </div>
      <div className="profile-friends">
        {USERS.map((u) => {
          return (
            <div className="friend-container" key={u.userId}>
              <img src={u.avatar} alt="" className="friend-img" />
              <div className="friend-name">
                <strong>{u.fullname}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

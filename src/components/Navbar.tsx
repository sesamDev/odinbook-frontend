import "../styles/Navbar.css";

import { Link } from "react-router-dom";
import NavButton from "./buttons/NavButton";
import React from "react";
import { SetUserStateProp } from "../App";
import { deleteJwtToken } from "../auth";

//FIXME: Move Logout button to the right
function Navbar(props: SetUserStateProp) {
  function handleLogout() {
    deleteJwtToken();
    props.setUser(null);
  }
  return (
    <div className="app-navbar">
      <h1>odinbook</h1>
      <ul>
        <li>
          <Link to="/">
            <NavButton type="home" />
          </Link>
        </li>
        <li>
          <Link to="/friends">
            <NavButton type="friends" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <NavButton type="profile" />
          </Link>
        </li>
        <li>
          <div onClick={handleLogout}>
            <NavButton type="logout" />
          </div>
        </li>
      </ul>
      <div className="app-line"></div>
    </div>
  );
}

export default Navbar;

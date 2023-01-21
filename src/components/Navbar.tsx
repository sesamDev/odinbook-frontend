import "../styles/Navbar.css";

import { Link } from "react-router-dom";
import React from "react";
import { SetUserStateProp } from "../App";
import { deleteJwtToken } from "../auth";

const fbColor = "rgb(57 117 234)";

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
            <svg width="32px" height="32px" viewBox="0 0 24 24">
              <path fill={fbColor} d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>
          </Link>
        </li>
        <li>
          <Link to="/friends">
            <svg width="32px" height="32px" viewBox="0 0 24 24">
              <path
                fill={fbColor}
                d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <svg width="32px" height="32px" viewBox="0 0 24 24">
              <path
                fill={fbColor}
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <div onClick={handleLogout}>
            <svg width="32px" height="32px" viewBox="0 0 24 24">
              <path
                fill={fbColor}
                d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
              />
            </svg>
          </div>
        </li>
      </ul>
      <div className="app-line"></div>
    </div>
  );
}

export default Navbar;

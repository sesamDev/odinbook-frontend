import "../styles/Navbar.css";

import { Link } from "react-router-dom";
import React from "react";

const fbColor = "rgb(57 117 234)";

function Navbar() {
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
      </ul>
      <div className="app-line"></div>
    </div>
  );
}

export default Navbar;

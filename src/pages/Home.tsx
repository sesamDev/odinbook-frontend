import "../styles/Home.css";

import Post from "../components/Post";
import React from "react";
import { USERS } from "../data/faker";

function Home() {
  return (
    <div>
      {USERS.map((u) => {
        return (
          <>
            <Post user={u} />
            <div className="app-line"></div>
          </>
        );
      })}
    </div>
  );
}

export default Home;

import "../styles/Home.css";

import Post from "../components/Post";
import React from "react";
import { USERS } from "../data/faker";
import { UserProp } from "../App";

function Home(props: UserProp) {
  return (
    <>
      <div className="app-home">
        {/* {USERS.map((u) => {
          return (
            <>
              <Post user={u} />
              <div className="app-line"></div>
            </>
          );
        })} */}
        <div className="home-bottom" onClick={() => window.scrollTo(0, 0)}>
          Back to top
        </div>
      </div>
    </>
  );
}

export default Home;

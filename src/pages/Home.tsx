import "../styles/Home.css";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import React from "react";
import { USERS } from "../data/faker";
import { UserProp } from "../App";
import { useState } from "react";

//TODO: Get users friends posts
//TODO: Create posts
//TODO: Add like functionallity
//TODO: Add comment functionallity

function Home(props: UserProp) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  return (
    <>
      <div className="app-home">
        {isCreatingPost ? (
          <></>
        ) : (
          <div className="home-add-post">
            <button onClick={() => setIsCreatingPost(true)}>Create new post</button>
            <div className="app-line"></div>
          </div>
        )}
        {isCreatingPost ? <CreatePost setIsCreatingPost={setIsCreatingPost} /> : <></>}
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

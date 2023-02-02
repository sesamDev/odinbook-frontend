import "../styles/Home.css";

import { CurrentUser, PostData } from "../types";
import { useEffect, useState } from "react";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import React from "react";
import { getJwtToken } from "../auth";

//TODO: Add images to posts
//TODO: Add comment functionallity
//FIXME: Back to top button not visible anymore

interface HomeProps {
  user: CurrentUser;
}

function Home(props: HomeProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState<PostData[]>();
  const user = props.user;

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:3000/api/v1/posts/" + user?._id, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      });
      const posts = await response.json();
      return posts;
    }

    getPosts().then((posts) => setPosts(posts));
  }, []);
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
        {isCreatingPost ? <CreatePost setIsCreatingPost={setIsCreatingPost} user={user} /> : <></>}
        {posts?.map((post) => {
          return (
            <>
              <Post post={post} user={user} key={post._id} />
              <div className="app-line"></div>
            </>
          );
        })}
        <div className="home-bottom" onClick={() => window.scrollTo(0, 0)}>
          Back to top
        </div>
      </div>
    </>
  );
}

export default Home;

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
  setIsLoading: CallableFunction;
}

function Home(props: HomeProps) {
  const { setIsLoading } = props;
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isViewingPost, setIsViewingPost] = useState(false);
  const [focusedPost, setFocusedPost] = useState<string>("");
  const [post, setPost] = useState<JSX.Element>();
  const [posts, setPosts] = useState<PostData[]>();
  const user = props.user;

  useEffect(() => {
    getPosts(user).then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!focusedPost) return;
    getOnePost(focusedPost, user, focusedPost, setIsViewingPost, setFocusedPost).then((p) => setPost(p));
  }, [focusedPost]);
  return (
    <>
      <div className="app-home">
        {isCreatingPost || isViewingPost ? (
          <></>
        ) : (
          <div className="home-add-post">
            <button onClick={() => setIsCreatingPost(true)}>Create new post</button>
            <div className="app-line"></div>
          </div>
        )}
        {isCreatingPost ? <CreatePost setIsCreatingPost={setIsCreatingPost} user={user} /> : <></>}
        {posts?.map((post) => {
          if (!focusedPost) {
            return (
              <>
                <Post
                  post={post}
                  user={user}
                  key={post._id}
                  setIsViewingPost={setIsViewingPost}
                  setFocusedPost={setFocusedPost}
                  focusedPost={focusedPost}
                />
                <div className="app-line"></div>
              </>
            );
          }
        })}
        {isViewingPost ? (
          post
        ) : (
          <div className="home-bottom" onClick={() => window.scrollTo(0, 0)}>
            Back to top
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

async function getPosts(user: CurrentUser) {
  const response = await fetch(import.meta.env.VITE_API_URL + "posts/" + user._id, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
  const posts = await response.json();
  return posts;
}

async function getOnePost(
  postId: string,
  user: CurrentUser,
  focusedPost: string,
  setIsViewinPost: CallableFunction,
  setFocusedPost: CallableFunction
): Promise<JSX.Element> {
  const response = await fetch(import.meta.env.VITE_API_URL + "posts/target/" + postId, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
  const post = (await response.json()) as PostData;
  return (
    <Post
      post={post}
      user={user as CurrentUser}
      key={post._id}
      setIsViewingPost={setIsViewinPost}
      setFocusedPost={setFocusedPost}
      focusedPost={focusedPost}
    />
  );
}

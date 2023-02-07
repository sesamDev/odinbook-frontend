import "../styles/Post.css";

import { CommentType, CurrentUser, PostData } from "../types";
import React, { FormHTMLAttributes, MouseEvent, useEffect, useState } from "react";

import Comment from "./Comment";
import { fbColor } from "../App";
import { getJwtToken } from "../auth";

interface PostProps {
  post: PostData;
  user: CurrentUser;
  focusedPost: string;
  setIsViewingPost: CallableFunction;
  setFocusedPost: CallableFunction;
}

interface CommentFormElements extends HTMLFormControlsCollection {
  text: HTMLInputElement;
}

interface CFormElement extends HTMLFormElement {
  readonly elements: CommentFormElements;
}

function Post(props: PostProps) {
  const { post, user, setIsViewingPost, setFocusedPost, focusedPost } = props;
  const [postLikes, setPostLikes] = useState(() => post.likes.length);
  const [postLiked, setPostLiked] = useState<boolean>(false);
  const [postLikeButtonColor, setPostLikeButtonColor] = useState(() => "currentColor");
  const [comments, setComments] = useState<CommentType[]>();

  function handleLikeButton(e: MouseEvent) {
    e.preventDefault();
    const buttonElement = e.target as HTMLElement;

    if (postLiked) {
      decreaseLocalLikeByOne(setPostLikes);
      toggleLikeButtonColor(setPostLikeButtonColor, postLiked);
      removeLikeFromDatabase(buttonElement.parentElement?.parentElement?.id, user?._id);
      setPostLiked(false);

      return;
    }

    increaseLocalLikeByOne(setPostLikes);
    toggleLikeButtonColor(setPostLikeButtonColor, postLiked);
    addLikeToDatabase(buttonElement.parentElement?.parentElement?.id, user?._id);
    setPostLiked(true);
  }

  function handleCommentButton(e: MouseEvent) {
    e.preventDefault();
    const buttonElement = e.target as HTMLElement;
    const postId = buttonElement.parentElement?.parentElement?.id;

    console.log("Add comment on: ", postId);
    setIsViewingPost(true);
    setFocusedPost(postId);
  }

  async function handleCommentSubmit(e: React.FormEvent<CFormElement>) {
    e.preventDefault();
    const text = e.currentTarget.elements.text.value;
    console.log(post._id);
    console.log(user._id);
    await fetch(
      "http://localhost:3000/api/v1/posts/comment/add?postID=" + post._id + "&userID=" + user._id + "&text=" + text,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      }
    );
    getComments(post._id).then((c) => setComments(c));
  }

  // Check if user has liked post before and light up like button
  useEffect(() => {
    if (post.likes.includes(user._id)) {
      toggleLikeButtonColor(setPostLikeButtonColor, postLiked);
      return setPostLiked(true);
    }
  }, []);

  useEffect(() => {
    if (focusedPost) {
      getComments(post._id).then((c) => setComments(c));
    }
  }, []);

  return (
    <div className="post-card" id={post._id}>
      <div className="post-profile">
        <img src={""} alt="profile" />
        <div className="profile-name-date-wrapper">
          <p className="profile-name">{`${post.author.first_name} ${post.author.last_name}`}</p>
          <p className="profile-date">{`${post.timestamp}`}</p>
        </div>
      </div>
      <div className="post-text">{post.text}</div>
      <div className="post-img">
        {/* TODO: Add image */}
        <img src={""} alt="" />
      </div>
      <div className="post-likes">
        <svg width="24px" height="24px" viewBox="0 0 24 24">
          <path
            fill={fbColor}
            d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
          />
        </svg>
        <p>{postLikes}</p>
      </div>
      <div className="post-buttons">
        <button className="post-button-like" onClick={(e) => handleLikeButton(e)}>
          <svg width="32px" height="32px" viewBox="0 0 24 24">
            <path
              fill={postLikeButtonColor}
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>
        </button>

        {focusedPost ? (
          //TODO: Add new icon, close button in post
          <button
            className="post-button-comment"
            onClick={() => {
              setIsViewingPost(false);
              setFocusedPost("");
            }}
          >
            Close
          </button>
        ) : (
          <button className="post-button-comment" onClick={(e) => handleCommentButton(e)}>
            <svg width="32px" height="32px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
              />
            </svg>
          </button>
        )}
      </div>

      {focusedPost ? (
        <>
          <p>Comments</p>

          {comments?.map((comm) => {
            return <Comment comment={comm} key={comm._id} />;
          })}

          <form className="post-comment-form" onSubmit={(e: React.FormEvent<CFormElement>) => handleCommentSubmit(e)}>
            <label htmlFor="text">Add comment</label>
            <input type="text" name="text" placeholder="Comment.." />
            <button>Post</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Post;

function toggleLikeButtonColor(setPostLikeButtonColor: CallableFunction, postLiked: boolean) {
  if (postLiked) return setPostLikeButtonColor("currentColor");
  if (!postLiked) return setPostLikeButtonColor(fbColor);
}

function decreaseLocalLikeByOne(setLikeCount: CallableFunction) {
  return setLikeCount((prev: number) => prev - 1);
}

function removeLikeFromDatabase(postId: string | undefined, userId: string | undefined) {
  if (postId === undefined && userId === undefined) throw new Error("Update like");

  return fetch("http://localhost:3000/api/v1/posts/like/remove?postId=" + postId + "&userId=" + userId, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
}

function increaseLocalLikeByOne(setLikeCount: CallableFunction) {
  return setLikeCount((prev: number) => prev + 1);
}

async function addLikeToDatabase(postId: string | undefined, userId: string | undefined) {
  if (postId === undefined && userId === undefined) throw new Error("Update like");

  return fetch("http://localhost:3000/api/v1/posts/like/add?postId=" + postId + "&userId=" + userId, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
}

async function getComments(postID: string): Promise<CommentType[]> {
  const response = await fetch("http://localhost:3000/api/v1/posts/comment/?postID=" + postID, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });

  const comment = await response.json();

  return comment;
}

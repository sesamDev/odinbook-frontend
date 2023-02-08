import "../styles/CreatePost.css";

import React from "react";
import { UserProp } from "../App";
import { getJwtToken } from "../auth";

interface SetIsCreatingPostStateProp {
  setIsCreatingPost: CallableFunction;
}

interface FormElements extends HTMLFormControlsCollection {
  text: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function CreatePost(props: SetIsCreatingPostStateProp & UserProp) {
  async function handleSubmit(e: React.FormEvent<PostFormElement>) {
    e.preventDefault();
    props.setIsCreatingPost(false);

    await fetch(import.meta.env.VITE_API_URL + "posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/JSON",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({
        text: e.currentTarget.elements.text.value,
        author: props.user?._id,
      }),
    });
  }
  return (
    <>
      <div className="app-line"></div>
      <div className="create-post-body">
        <h1 className="create-post-header">Create post</h1>
        <form action="" onSubmit={(e: React.FormEvent<PostFormElement>) => handleSubmit(e)}>
          <div>
            <label htmlFor="text"></label>
            <textarea className="create-post-status-input" name="text" placeholder="Post text"></textarea>
          </div>
          <div>
            <label className="create-post-upload-image" htmlFor="image"></label>
            <input type="file" />
          </div>
          <button>Publish</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;

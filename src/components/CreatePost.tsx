import "../styles/CreatePost.css";

import React from "react";

interface SetIsCreatingPostStateProp {
  setIsCreatingPost: CallableFunction;
}

interface FormElements extends HTMLFormControlsCollection {
  status: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function CreatePost(props: SetIsCreatingPostStateProp) {
  function handleSubmit(e: React.FormEvent<PostFormElement>) {
    e.preventDefault();
    props.setIsCreatingPost(false);
    console.log(e.currentTarget.elements.status.value);
  }
  return (
    <>
      <div className="app-line"></div>
      <div className="create-post-body">
        <h1 className="create-post-header">Create post</h1>
        <form action="" onSubmit={(e: React.FormEvent<PostFormElement>) => handleSubmit(e)}>
          <div>
            <label htmlFor="status"></label>
            <textarea className="create-post-status-input" name="status" placeholder="Post text"></textarea>
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

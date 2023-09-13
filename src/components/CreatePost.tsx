import "../styles/CreatePost.css";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import React from "react";
import { UserProp } from "../App";
import { getJwtToken } from "../auth";

interface SetIsCreatingPostStateProp {
  setIsCreatingPost: CallableFunction;
}

interface FormElements extends HTMLFormControlsCollection {
  text: HTMLInputElement;
  imageFile: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function CreatePost(props: SetIsCreatingPostStateProp & UserProp) {
  let firebaseImageURL = "";

  async function uploadImage(img: File) {
    const storage = getStorage();
    const image = img.name + Date.now();
    const storageRef = ref(storage, image);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, img).then(() => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(ref(storage, image)).then((url) => {
      firebaseImageURL = url;
    });
  }

  async function handleSubmit(e: React.FormEvent<PostFormElement>) {
    e.preventDefault();
    const textInput = e.currentTarget.elements.text.value;
    if (e.currentTarget.elements.imageFile.files !== null) {
      await uploadImage(e.currentTarget.elements.imageFile.files[0]);
    }

    await fetch(import.meta.env.VITE_API_URL + "posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/JSON",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({
        text: textInput,
        author: props.user?._id,
        imgURL: firebaseImageURL,
      }),
    });
    props.setIsCreatingPost(false);
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
            <input type="file" name="imageFile" />
          </div>
          <button>Publish</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;

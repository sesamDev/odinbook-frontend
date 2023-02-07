import "../styles/Comment.css";

import React, { useEffect, useState } from "react";

import { CommentType } from "../types";

//TODO: Fix timestamp format.
interface IComment {
  comment: CommentType | undefined;
}

function Comment(props: IComment) {
  const { comment } = props;

  return (
    <div className="post-comment">
      <img src="/" alt="avatar" />
      <div className="comment-card">
        <p className="author">{comment?.author.first_name + " " + comment?.author.last_name}</p>
        <p className="text">{comment?.text}</p>
        <p className="timestamp">{`${comment?.timestamp}`}</p>
      </div>
    </div>
  );
}

export default Comment;

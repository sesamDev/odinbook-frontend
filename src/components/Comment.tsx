import React, { useEffect, useState } from "react";

import { CommentType } from "../types";

interface IComment {
  comment: CommentType | undefined;
}

function Comment(props: IComment) {
  const { comment } = props;

  return (
    <div className="post-comments">
      <div className="comment-card">
        <img src="/" alt="avatar" />
        <div>
          <p>{comment?.author.first_name + " " + comment?.author.last_name}</p>
          <p>{comment?.text}</p>
          <p>{`${comment?.timestamp}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;

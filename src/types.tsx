export type CurrentUser = {
  _id: string;
  first_name: string;
  last_name: string;
  admin: boolean;
  avatar: string;
  friends: User[];
};

export type User = CurrentUser;

export type PostData = {
  _id: string;
  author: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  text: string;
  likes: string[];
  timestamp: Date;
};

export type CommentType = {
  _id: string;
  text: string;
  author: User;
  related_post: string;
  timestamp: Date;
  likes: string[];
};

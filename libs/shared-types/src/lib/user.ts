export type PublicUser = {
  id: number;
  username: string;
  status: string;
  avatarUrl: string;
  profileBanner: string;
  points: number;
  joined: number; //Timestamp
};

export type User = {
  id: number;
  username: string;
  avatarUrl?: string;
};

export type Comment = {
  id: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Comments = {
  users: User[];
  comments: Comment[];
};

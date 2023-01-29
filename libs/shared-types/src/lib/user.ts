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
  message: string;
  likes: number;
  dislikes: number;
  date: Date;
  author: string;
  author_avatar?: string;
};

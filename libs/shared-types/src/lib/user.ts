import { Message, Prisma } from '@prisma/client';

export type PublicUser = {
  id: number;
  username: string;
  status: string;
  avatarUrl: string;
  profileBanner: string;
  points: number;
  joined: number; //Timestamp
  stats?: Prisma.JsonValue;
  friends: User[];
};

export type UserStats = {
  tictactoe?: number;
  rps?: number;
};

export type User = {
  id: number;
  username: string;
  status?: string;
  avatarUrl?: string;
  online?: boolean;
};

export type UpdateUser = {
  status?: string;
};

export type Comment = {
  id: number;
  authorId: number;
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

export type ChatData = {
  friends: User[];
  inbox: PartialInbox[];
};

export type PartialInbox = {
  id: number;
  lastMessage: string;
  lastSenderId: number;
  read: boolean;
  user: User;
  messages: Message[];
};

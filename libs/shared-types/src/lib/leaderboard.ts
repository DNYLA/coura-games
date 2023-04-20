import { GameType, Result } from '@prisma/client';
import { Games } from './sockets';
import { User } from './user';

export type LeaderboardStat = {
  username: string;
  points: number;
};

export type Leaderboard = {
  title: string;
  global: LeaderboardStat[];
  weekly: LeaderboardStat[];
  daily: LeaderboardStat[];
};

export type LeagueTable = {
  users: User[];
  data: Map<string, Leaderboard>;
};

//They are given a string value so we can reference leaderboard[LeaderboardType] inside of the json object above.
export enum LeaderboardType {
  Daily = 'daily',
  Weekly = 'weekly',
  Global = 'global',
}

export type MatchPreview = {
  id: number;
  playback: object;
  opponent: User;
  result: Result;
  timestamp: number;
  type: GameType;
};

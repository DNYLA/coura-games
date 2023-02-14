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

//They are given a string value so we can reference leaderboard[LeaderboardType] inside of the json object above.
export enum LeaderboardType {
  Daily = 'daily',
  Weekly = 'weekly',
  Global = 'global',
}

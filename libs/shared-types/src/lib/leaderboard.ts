export type LeaderboardStat = {
  username: string;
  points: number;
};

export type Leaderboard = {
  title: string;
  period: string;
  global: LeaderboardStat[];
  weekly: LeaderboardStat[];
  daily: LeaderboardStat[];
};

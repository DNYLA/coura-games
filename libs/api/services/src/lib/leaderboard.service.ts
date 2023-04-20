import {
  Leaderboard,
  LeaderboardStat,
  LeaderboardType,
  LeagueTable,
} from '@couragames/shared-types';
import { GameType } from '@prisma/client';
import { RedisService } from './redis.service';
import { prisma } from './prisma.service';
import { UserService } from './user.service';

export class LeaderboardService {
  static async fetchLeaderboards(): Promise<LeagueTable> {
    //Check Cache

    const leaderboardmap = new Map<string, Leaderboard>();
    const keys = Object.keys(GameType);

    let globalLeaderboard: Map<string, { values: LeaderboardStat[] }> =
      (await RedisService.getJson(`global-leaderboard`, {})) as unknown as Map<
        string,
        { values: LeaderboardStat[] }
      >;

    if (!globalLeaderboard)
      globalLeaderboard = await LeaderboardService.SyncGlobalLeaderboards();

    const usernames: string[] = [];

    for (let i = 0; i < keys.length; i++) {
      const type = keys[i];

      const weeklyData = await RedisService.getLeaderboard(
        type,
        LeaderboardType.Weekly
      );
      const dailyData = await RedisService.getLeaderboard(
        type,
        LeaderboardType.Daily
      );

      leaderboardmap.set(type.toString(), {
        title: type,
        daily: dailyData,
        weekly: weeklyData,
        global: globalLeaderboard[type.toString()].values ?? [],
      });
      weeklyData.map((stat) => usernames.push(stat.username));
      dailyData.map((stat) => usernames.push(stat.username));
      globalLeaderboard[type.toString()]?.values.map((stat) =>
        usernames.push(stat.username)
      );
    }

    const users = await UserService.getManyUsers([], usernames); //Automatically filters out duplicates before fetching

    console.log(users);

    const table: LeagueTable = {
      users: users,
      data: leaderboardmap,
    };

    return table;
  }

  static async SyncGlobalLeaderboards() {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, avatarUrl: true, stats: true },
      where: { stats: { not: {} } },
    });

    const leaderboardmap = new Map<string, { values: LeaderboardStat[] }>();

    const keys = Object.keys(GameType);

    for (let i = 0; i < keys.length; i++) {
      const type = keys[i];

      leaderboardmap.set(type.toString(), { values: [] });
    }

    users.forEach((user) => {
      const stats = user.stats;
      Object.keys(stats).map((name) => {
        const newStat: LeaderboardStat = {
          username: user.username,
          points: stats[name],
        };

        const curStats = leaderboardmap.get(name);
        if (newStat.points) curStats.values.push(newStat);
      });
    });

    leaderboardmap.forEach((stat) => {
      stat.values.sort((a, b) => b.points - a.points);
      stat.values = stat.values.slice(0, 10);
    });

    await RedisService.setJson(
      'global-leaderboard',
      Object.fromEntries(leaderboardmap),
      {}
    );

    return leaderboardmap;
  }
}

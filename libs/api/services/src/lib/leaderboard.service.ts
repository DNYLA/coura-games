import { Leaderboard, LeaderboardStat } from '@couragames/shared-types';
import { GameType } from '@prisma/client';
import { prisma } from 'libs/api/services/src/lib/prisma.service';

type FilterStats = LeaderBoar;
export class LeaderboardService {
  static async fetchLeaderboards() {
    //Check Cache

    const users = await prisma.user.findMany({
      select: { id: true, username: true, avatarUrl: true, stats: true },
      where: { stats: { not: {} } },
    });

    const leaderboardmap = new Map<
      string,
      { lowest: number; values: LeaderboardStat[] }
    >();

    Object.keys(GameType).map((type) => {
      leaderboardmap.set(type.toString(), { lowest: 0, values: [] });
    });

    users.forEach((user) => {
      const stats = user.stats;
      Object.keys(stats).map((name) => {
        const newStat: LeaderboardStat = {
          username: user.username,
          points: stats[name],
        };

        const curStats = leaderboardmap.get(name);

        if (curStats.lowest > newStat.points) return;

        curStats.values.push();
      });
    });

    console.log(leaderboardmap);
    return leaderboardmap;
  }
}

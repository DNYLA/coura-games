import { prisma } from 'libs/api/services/src/lib/prisma.service';

export class LeaderboardService {
  async fetchLeaderboards() {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, avatarUrl: true, stats: true },
    });
  }
}

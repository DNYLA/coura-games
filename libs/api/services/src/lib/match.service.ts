import { GameType, Prisma, Result, User } from '@prisma/client';
import { stat } from 'fs';
import { UserService } from './user.service';
import { prisma } from './prisma.service';
import { RedisService } from './redis.service';
import { MatchPreview } from '@couragames/shared-types';

export class MatchService {
  static async createMatch(
    players: Prisma.MatchPlayerCreateManyMatchInput[],
    playback: object,
    type: GameType
  ) {
    console.log(players);
    //Generate UUID?

    // Create Match Object
    console.log(players);
    const userQueries: string | any[] = [];
    //Await Post to Database
    const match = await prisma.match.create({
      data: { playback, type, players: { createMany: { data: players } } },
    });

    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      const user = await UserService.getUser(player.userId);
      const statsObject = user.stats ?? {};

      //If Result === Win then Points = 2 else if result === Draw Then points = 1 else points = 0
      const intValue =
        player.result === Result.Win
          ? 2
          : player.result === Result.Draw
          ? 1
          : 0;

      if (intValue === 0) continue; //no Need to update Database if player scored 0 points

      if (statsObject[type]) {
        statsObject[type] = statsObject[type] + intValue;
      } else {
        statsObject[type] = intValue;
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { stats: statsObject },
      });

      //Update Weekly & Daily Set

      await RedisService.increaseUserScore(user.username, intValue, type);

      // const whereClause = Prisma.validator<Prisma.UserWhereInput>()({
      //   id: user.id,
      // });

      // const dataClause = Prisma.validator<Prisma.UserUpdateInput>()({
      //   stats: statsObject,
      // });

      // userQueries.push(
      //   prisma.user.update({
      //     where: whereClause,
      //     data: dataClause,
      //   })
      // );
    }

    if (userQueries.length > 0) {
      console.log('Running transaction');
      console.log(userQueries);
      await prisma.$transaction(userQueries);
    }
    //Return Match?
    return match;
  }

  static async getPreviousMatches(userId: number, limit?: number) {
    const matches = await prisma.match.findMany({
      where: { players: { some: { userId } } },
      include: {
        players: {
          select: {
            result: true,
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit ?? 15,
    });

    const formattedMatches: MatchPreview[] = [];

    matches.forEach((match) => {
      const opponent = match.players.find((p) => p.user.id !== userId);
      const result: Result =
        opponent.result === Result.Win
          ? Result.Loss
          : opponent.result === Result.Loss
          ? Result.Win
          : Result.Draw;
      formattedMatches.push({
        id: match.id,
        result: result,
        playback: undefined,
        opponent: opponent.user,
        timestamp: match.createdAt.getTime(),
      });
    });

    return formattedMatches;
  }
}

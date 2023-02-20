import { Game, Prisma } from '@prisma/client';
import { prisma } from './prisma.service';

export class MatchService {
  static async createMatch(
    players: Prisma.MatchPlayerCreateManyInput,
    playback: object,
    type: Game
  ) {
    //Generate UUID?

    // Create Match Object

    //Await Post to Database
    const match = await prisma.match.create({
      data: { playback, type, players: { createMany: { data: players } } },
    });

    //Return Match?
    return match;
  }
}

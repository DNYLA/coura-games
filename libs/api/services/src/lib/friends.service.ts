import { FriendStatus, GameType, Prisma, Result, User } from '@prisma/client';
import { stat } from 'fs';
import { UserService } from './user.service';
import { prisma } from './prisma.service';
import { RedisService } from './redis.service';

export class FriendService {
  static async addFriend(fromId: number, toId: number) {
    try {
      await prisma.user.update({
        where: { id: fromId },
        data: { friends: { connect: { id: toId } } },
      });
    } catch {
      // Problem Can occur due to id provided not existing || possibl already friends
      //This error will only occcur when a user manually tries to send the request
      //so theres no need to handle error
    }
  }

  static async friendTest() {
    await prisma.user.update({
      where: { id: 1 },
      data: { friends: { connect: { id: 2 } } },
    });

    return true;
  }
}

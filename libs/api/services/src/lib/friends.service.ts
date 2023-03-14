import { FriendStatus, GameType, Prisma, Result, User } from '@prisma/client';
import { stat } from 'fs';
import { UserService } from './user.service';
import { prisma } from './prisma.service';
import { RedisService } from './redis.service';

export class FriendsService {
  static async addFriend(fromId: number, toId: number) {
    try {
      await prisma.friend.create({
        data: { userOneId: fromId, userTwoId: toId },
      });
    } catch {
      //Most likely already friends no need to do anything else
      //This error will only occcur when a user manually tries to send the request
    }
  }

  static async updateFriend(
    requesterId: number,
    request: FriendStatus,
    targetId: number
  ) {
    const friendReq = await prisma.friend.findUnique({where: {}}) 
  }
}

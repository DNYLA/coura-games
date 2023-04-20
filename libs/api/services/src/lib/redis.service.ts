import { Lobby } from './utils/types';
import { redis } from './utils/redis';
import {
  LeaderboardStat,
  LeaderboardType,
  UserStats,
} from '@couragames/shared-types';
import { GameType } from '@prisma/client';

interface RedisOptions {
  expire?: number;
  path?: string;
}

export class RedisService {
  static async setJson(key: string, object: any, options: RedisOptions) {
    if (!options) options = {};
    const { expire, path } = options;
    await redis.json.set(key, path ? path : '.', object);

    if (expire) RedisService.setExpire(key, expire);
  }

  static async getJson(key: any, options: RedisOptions) {
    if (!options) options = {};
    const { expire, path } = options;

    const data = await redis.json.get(key, path ? path : '.');
    if (expire) RedisService.setExpire(key, expire);

    return data;
  }

  static async setLobby(code: string, game: Lobby, options?: RedisOptions) {
    return await RedisService.setJson(`lobby-${code}`, game, options);
  }

  static async getLobby(code: string, options?: RedisOptions): Promise<any> {
    return await RedisService.getJson(`lobby-${code}`, options);
  }

  static async setExpire(key: string, time: number) {
    await redis.expire(key, time);
  }

  static async Delete(key: string) {
    await redis.del(key);
  }

  // static async ValidateSets() {
  //   const keys = Object.keys(GameType);
  //   const periodKeys = Object.keys(LeaderboardType);
  //   for (let i = 0; i < keys.length; i++) {
  //     const key = keys[i];
  //     for (let j = 0; j < periodKeys.length; j++) {
  //       const period = periodKeys[j];
  //       const setName = `${key}-${period}`;
  //       const set = await redis.(setName);
  //       console.log(set);

  //       if (!set) await redis.zAdd(setName, );
  //     }
  //   }
  //   Object.keys(GameType).map((key) => {
  //     console.log(key);
  //   });
  // }

  static async increaseUserScore(
    username: string,
    increaseBy: number,
    type: GameType
  ) {
    await redis.zIncrBy(
      `${type}-${LeaderboardType.Daily}`,
      increaseBy,
      username
    );

    await redis.zIncrBy(
      `${type}-${LeaderboardType.Weekly}`,
      increaseBy,
      username
    );
  }

  static async getLeaderboard(
    type: GameType | string,
    period: LeaderboardType,
    limit?: number
  ) {
    if (!limit) limit = 10;

    const data = await redis.zRangeWithScores(`${type}-${period}`, 0, 9);

    const parsedList: LeaderboardStat[] = [];
    data.forEach((stat) => {
      parsedList.push({ username: stat.value, points: stat.score });
    });

    parsedList.sort((a, b) => b.points - a.points);
    return parsedList;
    // return parsedList.sort((a, b) => b.points - a.points);
  }
}

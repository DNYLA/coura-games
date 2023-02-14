import { RedisClientType } from '@redis/client';
import { Lobby } from 'libs/game-logic/src/lib/utils/types';
import { redis } from './utils/redis';

interface RedisOptions {
  expire?: number;
  path?: string;
}

export class RedisService {
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(redisClient: RedisClientType) {}

  async setJson(key: string, object: any, options: RedisOptions) {
    if (!options) options = {};
    const { expire, path } = options;
    await redis.json.set(key, path ? path : '.', object);

    if (expire) this.setExpire(key, expire);
  }

  async getJson(key: any, options: RedisOptions) {
    if (!options) options = {};
    const { expire, path } = options;

    const data = await redis.json.get(key, path ? path : '.');
    if (expire) this.setExpire(key, expire);

    return data;
  }

  async setLobby(code: string, game: Lobby, options?: RedisOptions) {
    return await this.setJson(`lobby-${code}`, game, options);
  }

  async getLobby(code: string, options?: RedisOptions): Promise<any> {
    return await this.getJson(`lobby-${code}`, options);
  }

  async setExpire(key: string, time: number) {
    await redis.expire(key, time);
  }
}

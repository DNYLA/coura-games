import { redis } from '@couragames/game-logic';

class RedisManager {
  /**
   *
   */
  constructor() {}
}

interface RedisOptions {
  expire?: number;
  path?: string;
}
async function setJson(key: string, object: any, options: RedisOptions) {
  if (!options) options = {};
  const { expire, path } = options;
  await redis.json.set(key, path ? path : '.', object);

  if (expire) setExpire(key, expire);
}

async function getJson(key, options: RedisOptions) {
  if (!options) options = {};
  const { expire, path } = options;

  const data = await redis.json.get(key, path ? path : '.');
  if (expire) setExpire(key, expire);

  return data;
}

async function getLobby(code: string, options: RedisOptions) {
  return await getJson(`lobby-${code}`, options);
}

async function setExpire(key: string, time: number) {
  await redis.expire(key, time);
}

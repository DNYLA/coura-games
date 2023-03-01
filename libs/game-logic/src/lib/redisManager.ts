import { Lobby } from '@couragames/api/services';
import { redis } from '@couragames/api/services';

class RedisManager {
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

export async function setLobby(
  code: string,
  game: Lobby,
  options?: RedisOptions
) {
  return await setJson(`lobby-${code}`, game, options);
}

export async function getLobby(
  code: string,
  options?: RedisOptions
): Promise<any> {
  return await getJson(`lobby-${code}`, options);
}

async function setExpire(key: string, time: number) {
  await redis.expire(key, time);
}

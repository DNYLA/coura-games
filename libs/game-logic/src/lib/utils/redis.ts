import * as Redis from 'redis';

const redis = Redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

redis.on('connect', async () => {
  // redis.flushDb();
  console.log('Redis: Connected');
});

redis.on('error', (error) => {
  console.log(error);
});

export { redis };

import * as express from 'express';
import { createServer } from 'http';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { router as authRouter } from './routes/auth';
import { router as memberRouter } from './routes/user.controller';
import { router as friendsRouter } from './routes/friends.controller';
import { router as leaderboardRouter } from './routes/leaderboard.controller';
import { GameType, User as PrismaUser } from '@prisma/client';
import { socketEventHandler } from './socket';
import { Server } from 'socket.io';
import { getFrontendURL } from './utils';
import { redis as redisClent } from '@couragames/game-logic';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
import * as fileupload from 'express-fileupload';
import { redis, SocketIO, UserService } from '@couragames/api/services';
import { LeaderboardType, SocketData } from '@couragames/shared-types';
import * as cron from 'node-cron';
import { RedisService } from '@couragames/api/services';
require('./config/passport-local');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3333;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends PrismaUser {}
  }
}

app.set('trust proxy', 1);

//Middleware
app.use(
  cors({
    origin: [getFrontendURL()],
    credentials: true,
  })
);

const redisClient = createClient({
  legacyMode: true,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect();

redisClient.on('connect', function () {
  console.log('Connected to redis successfully');
});

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
const RedisStore = connectRedis(session);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  name: 'session-id',
  secret: '123-456-789',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 24 * 7, // ms * seconds * minutes * hours * days -> 7 days in miliseconds
  },
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// const io = new Server<
//   DefaultEventsMap,
//   DefaultEventsMap,
//   DefaultEventsMap,
//   SocketData
// >(httpServer, {
//   cors: { origin: [getFrontendURL()], credentials: true },
// });

SocketIO.initialiseServer(httpServer, getFrontendURL());

socketEventHandler(SocketIO.server)
  .use((socket: any, next: any) => {
    sessionMiddleware(socket.request, {} as any, next);
  })
  .use(async (socket, next) => {
    // console.log(socket.request.session);
    const userInfo = (socket.request as any).session.passport;
    if (!userInfo) {
      const randomId = String(Math.floor(Math.random() * 90000) + 10000);
      socket.data = { ...socket.data, username: `Guest-${randomId}` };
      next();
      return;
    }
    const user = await UserService.getUser(userInfo.user);
    socket.data = { ...socket.data, username: user.username, user };

    next();
  });

app.use(express.json()); //Parses All incoming data into JSON
app.use(express.urlencoded({ extended: false })); //Allows us to retreive data from Form Submissions
app.use(fileupload());
//Routes
app.use('/api/auth', authRouter);
app.use('/api/member', memberRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/leaderboard', leaderboardRouter);

cron.schedule('0 0 * * *', () => {
  const keys = Object.keys(GameType);
  for (let i = 0; i < keys.length; i++) {
    const type = keys[i];
    RedisService.Delete(`${type}-${LeaderboardType.Daily}`);
  }
});

cron.schedule('0 0 * * MON', () => {
  const keys = Object.keys(GameType);
  for (let i = 0; i < keys.length; i++) {
    const type = keys[i];
    RedisService.Delete(`${type}-${LeaderboardType.Weekly}`);
  }
});

(async () => {
  await redisClent.connect();
  // await redisClient.connect();

  const server = httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', (err) => console.log(err));
})();

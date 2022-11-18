import * as express from 'express';
import { createServer } from 'http';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { router as authRouter } from './routes/auth';
import { User as PrismaUser } from '@prisma/client';
import { socketEventHandler } from './socket';
import { Server } from 'socket.io';
import { getFrontendURL } from './utils';
import { redis as redisClent } from 'apps/api/src/redis';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
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

const RedisStore = connectRedis(session);
const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
redis.connect();

redis.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

redis.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});

app.use(
  session({
    // store: new RedisStore({ client: redis }),
    name: 'session-id',
    secret: '123-456-789',
    resave: true,
    saveUninitialized: false,
    // cookie: {
    //   httpOnly: true,
    //   secure: process.env.ENVIRONMENT === 'production' ? true : false,
    //   sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
    //   maxAge: 24 * 60 * 60 * 7 * 1000,
    // },
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);

const io = new Server(httpServer);
socketEventHandler(io);

app.use(express.json()); //Parses All incoming data into JSON
app.use(express.urlencoded({ extended: false })); //Allows us to retreive data from Form Submissions
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth', authRouter);
(async () => {
  await redisClent.connect();

  const server = httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', (err) => console.log(err));
})();

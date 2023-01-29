import * as express from 'express';
import { createServer } from 'http';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { router as authRouter } from './routes/auth';
import { router as memberRouter } from './routes/member.controller';
import { User as PrismaUser } from '@prisma/client';
import { socketEventHandler } from './socket';
import { Server } from 'socket.io';
import { getFrontendURL } from './utils';
// import { redis as redisClent } from '@couragames/game-logic';
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

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect();

redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
const RedisStore = connectRedis(session);

app.use(
  session({
    // store: new RedisStore({ client: redisClient }),
    // store: new RedisStore({
    //   host: process.env.REDIS_HOST,
    //   port: Number(process.env.REDIS_PORT),
    //   pass: process.env.REDIS_PASSWORD,
    //   client: createClient(),
    //   ttl: 260,
    // }),
    name: 'session-id',
    secret: '123-456-789',
    resave: false,
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
      maxAge: 1000 * 60 * 60 * 24 * 7, // ms * seconds * minutes * hours * days -> 7 days in miliseconds
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const io = new Server(httpServer, {
  cors: { origin: [getFrontendURL()], credentials: true },
});
socketEventHandler(io);

app.use(express.json()); //Parses All incoming data into JSON
app.use(express.urlencoded({ extended: true })); //Allows us to retreive data from Form Submissions
//Routes
app.use('/api/auth', authRouter);
app.use('/api/member', memberRouter);

(async () => {
  // await redisClent.connect();
  // await redisClient.connect();

  const server = httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', (err) => console.log(err));
})();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

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

//Middleware
app.use(
  cors({
    origin: [getFrontendURL()],
    credentials: true,
  })
);

app.use(
  session({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: false,
    resave: false,
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

const server = httpServer.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', (err) => console.log(err));

/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import prisma from '../services/prisma.service';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy(async function (username: string, password: string, done) {
    let foundUser: User;

    try {
      foundUser = await prisma.user.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
    } catch (err) {
      return done(null, false, 'invalid');
      // return dne(null, new Error('No user registered with this username'));
    }

    if (!foundUser) return done(null, false, 'invalid');

    //Verify Password with BCrypt
    let validPass = false;
    try {
      validPass = bcrypt.compareSync(password, foundUser.password);
    } catch (err) {
      return done(null, false, 'invalid');
    }

    if (!validPass) {
      return done(null, false, 'invalid');
    }

    //Send Data Back
    return done(null, foundUser);
  })
);

passport.serializeUser((user: any, cb: any) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb: any) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return cb(null, false); //Throw Error // Delete Session
  cb(null, user);
});

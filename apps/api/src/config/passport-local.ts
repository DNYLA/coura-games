import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async function (username: string, password: string, done) {
    let foundUser: User;
    console.log('HERE');

    try {
      foundUser = await prisma.user.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
    } catch (err) {
      return done(null, false, 'invalid');
      // return dne(null, new Error('No user registered with this username'));
    }
    console.log('HERE');

    if (!foundUser) return done(null, false, 'invalid');
    console.log('HERE');

    //Verify Password with BCrypt
    let validPass = false;
    try {
      validPass = bcrypt.compareSync(password, foundUser.password);
    } catch (err) {
      return done(null, false, 'invalid');
    }
    console.log('HERE');

    if (!validPass) {
      return done(null, false, 'invalid');
    }

    console.log('HERE');

    //Send Data Back
    return done(null, foundUser);
  })
);

passport.serializeUser((user: any, cb: any) => {
  console.log('HERE');

  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb: any) => {
  console.log('HERE');

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return cb(null, false); //Throw Error // Delete Session
  cb(null, user);
});

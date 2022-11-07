import { failed, logout, signup, user } from '../controllers/auth';
import { Router } from 'express';
import * as passport from 'passport';

const router = Router();

router.post(
  '/signup',
  signup,
  passport.authenticate('local', {
    successRedirect: 'user',
    failureRedirect: 'failed',
  })
);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'user',
    failureRedirect: 'failed',
  }),
  (_, res) => {
    res.sendStatus(200);
  }
);

router.post('/logout', logout);
router.get('/user', user);
router.get('/failed', failed);

export { router };

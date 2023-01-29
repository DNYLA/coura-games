import { UserService } from '../services/user.service';
import { Router } from 'express';
import * as passport from 'passport';

const router = Router();
const userService = new UserService();

router.get('/', async (req, res) => {
  res.send('Yourself');
});

router.get('/:username', async (req, res, next) => {
  console.log('Hit');
  const userName = req.params.username;

  if (!userName) return res.sendStatus(400).send('No Username Provided');
  const user = await userService.getUser(userName);

  if (!user) {
    res.sendStatus(404);
    // throw new Error('User Not Found!'); //Error not getting handled properly??
    return;
  }

  res.send(user);
});

export { router };

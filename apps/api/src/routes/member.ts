import { Router } from 'express';
import * as passport from 'passport';

const router = Router();

router.get('/:username', (req, res) => {
  console.log('Hit');
  const userName = req.params.username;

  if (!userName) return res.sendStatus(400).send('No Username Provided');

  res.send({
    username: userName,
    status: 'Winning games in my sleep...',
    points: 183,
    followers: 25,
    joined: new Date(),
  });
});

export { router };

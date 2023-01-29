import { UserService } from '../services/user.service';
import { Router } from 'express';
import * as passport from 'passport';
import { CommentsService } from '../services/comments.service';

const router = Router();
const userService = new UserService();
const commentsService = new CommentsService(userService);

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

router.get('/:username/comments', async (req, res, next) => {
  const userName = req.params.username;

  if (!userName) return res.sendStatus(400).send('No Username Provided');
  const comments = await commentsService.getComments(userName);

  if (!comments || comments.length === 0) {
    res.send({ comments: [], users: [] });
    return;
  }

  //Fetch Individual Users
  const userIds = comments.map((comment) => comment.fromUserId);
  const userInfos = await userService.getManyUsers(userIds);

  res.send({ comments, users: userInfos });
});

router.get('/:username/comments/create', async (req, res, next) => {
  const userName = req.params.username;

  if (!userName) return res.sendStatus(400).send('No Username Provided');
  const comments = await commentsService.getComments(userName);

  if (!comments || comments.length === 0) {
    res.send({ comments: [], users: [] });
    return;
  }

  //Fetch Individual Users
  const userIds = comments.map((comment) => comment.fromUserId);
  const userInfos = await userService.getManyUsers(userIds);

  res.send({ comments, users: userInfos });
});

export { router };

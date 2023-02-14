import { UserService } from '../services/user.service';
import { Router } from 'express';
import { CommentsService } from '../services/comments.service';

// import * as getStream from 'into-stream';

const router = Router();
const userService = new UserService();
const commentsService = new CommentsService(userService);

router.get('/', async (req, res) => {
  res.send('Yourself');
});

router.get('/:username', async (req, res) => {
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

router.patch('/:username', async (req, res) => {
  const userName = req.params.username.toLowerCase();
  const user = req.user;

  if (!user || user.username.toLowerCase() !== userName)
    return res.sendStatus(403);
  if (!userName) return res.sendStatus(400).send('No Username Provided');
  console.log(req.body);
  res.send(await userService.updateUser(user.id, req.body, req.files));
  // res.send(user);
});

router.get('/:username/comment', async (req, res) => {
  const userName = req.params.username;

  if (!userName) return res.sendStatus(400).send('No Username Provided');
  const comments = await commentsService.getComments(userName);

  if (!comments || comments.length === 0) {
    res.send({ comments: [], users: [] });
    return;
  }

  //Fetch Individual Users
  const userIds = comments.map((comment) => comment.authorId);
  const userInfos = await userService.getManyUsers(userIds);

  res.send({ comments, users: userInfos });
});

router.post('/:username/comment', async (req, res) => {
  const user = req.user;
  const data = req.body;
  if (!user) return res.sendStatus(401);
  const userName = req.params.username;
  if (!userName) return res.sendStatus(400).send('No Username Provided');
  console.log(data);
  try {
    const newComment = await commentsService.createComment(
      userName,
      user.id,
      data.message
    );
    res.send(newComment);
  } catch {
    res.sendStatus(500);
  }

  // res.send({ comments, users: userInfos });
});

router.delete('/:username/comment', async (req, res) => {
  const user = req.user;
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.sendStatus(400);
  if (!user) return res.sendStatus(401);

  const userName = req.params.username;
  if (!userName) return res.sendStatus(400).send('No Username Provided');

  try {
    const valid = await commentsService.deleteComment(id, user.id);
    if (valid) res.sendStatus(200);
    else res.sendStatus(401); //Function returns false if not authorised
  } catch {
    res.sendStatus(500);
  }

  // res.send({ comments, users: userInfos });
});

export { router };

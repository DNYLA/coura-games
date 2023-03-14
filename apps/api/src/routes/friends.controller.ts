import { FriendService } from '@couragames/api/services';
import { Router } from 'express';

const router = Router();

//Add Authentication
router.post('/add/', async (req, res) => {
  const user = req.user;
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.sendStatus(400);
  if (!user) return res.send(403);

  await FriendService.addFriend(user.id, id);

  res.sendStatus(200);

  // res.send('Test');
});

export { router };

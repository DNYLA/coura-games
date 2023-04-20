import {
  FriendService,
  NotificationService,
  UserService,
} from '@couragames/api/services';
import { NotificationType } from '@prisma/client';
import { Router } from 'express';

const router = Router();

//Add Authentication
router.post('/add/', async (req, res) => {
  const user = req.user;
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.sendStatus(400);
  if (!user) return res.send(403);

  await FriendService.addFriend(user.id, id);
  const friendUser = await UserService.getUser(id);
  res.sendStatus(200);
  NotificationService.createNotification({
    targetId: id,
    fromId: user.id,
    action: `/member/${user.username}`,
    message: `${user.username} added you as a friend.`,
    type: NotificationType.FriendRequest,
  });
  // res.send('Test');
});

export { router };

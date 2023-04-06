import {
  Socket,
  User,
  PartialInbox,
  SocketData,
} from '@couragames/shared-types';
import {
  Comment,
  Inbox,
  Message,
  NotificationStatus,
  NotificationType,
  Prisma,
} from '@prisma/client';
import { SocketService } from './socket.service';
import { RemoteSocket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { prisma } from './prisma.service';
import { UserService } from './user.service';

export type CreateNotification = {
  targetId: number;
  fromId: number;
  action?: string;
  type: NotificationType;
};

export class NotificationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  static async createNotification(notif: CreateNotification) {
    // const createdNotif = await prisma.notification.create({
    //   data: {
    //     targetId: notif.targetId,
    //     fromId: notif.fromId,
    //     action: notif.action,
    //     type: notif.type,
    //   },
    // });

    // const sockets = await SocketService.getUserConnectedSockets(notif.targetId);
    SocketService.emitAll(notif.targetId, 'notification', {
      message: 'Someone Likes your picture',
    });
  }
}

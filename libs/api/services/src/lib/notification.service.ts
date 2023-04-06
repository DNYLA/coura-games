import {
  Socket,
  User,
  PartialInbox,
  SocketData,
  ReceivedNotification,
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
import { create } from 'domain';

export type CreateNotification = {
  targetId: number;
  fromId: number;
  action?: string;
  message: string;
  type: NotificationType;
};

export class NotificationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  static async createNotification(notif: CreateNotification) {
    if (notif.targetId === notif.fromId) return; //Prevent sending notification to self
    const user = await UserService.getUser(notif.fromId);
    const createdNotif = await prisma.notification.create({
      data: {
        targetId: notif.targetId,
        fromId: notif.fromId,
        message: notif.message,
        action: notif.action,
        type: notif.type,
      },
    });

    const notification: ReceivedNotification = {
      id: createdNotif.id,
      fromUser: {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      message: createdNotif.message,
      action: notif.action,
      createdAt: createdNotif.createdAt,
      type: createdNotif.type,
      status: createdNotif.status,
    };

    // const sockets = await SocketService.getUserConnectedSockets(notif.targetId);
    SocketService.emitAll(notif.targetId, 'notification', notification);
  }
}

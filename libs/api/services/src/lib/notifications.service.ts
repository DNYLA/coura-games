import { NotificationStatus } from '@prisma/client';
import { prisma } from './prisma.service';

export class NotificationService {
  static async getNotifications(userId: number) {
    await prisma.notification.findMany({
      where: {
        targetId: userId,
        status: {
          notIn: [NotificationStatus.Read, NotificationStatus.Cancelled],
        },
      },
    });
  }
}

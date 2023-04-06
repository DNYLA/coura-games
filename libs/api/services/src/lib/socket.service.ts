import {
  Socket,
  User,
  PartialInbox,
  SocketData,
} from '@couragames/shared-types';
import { Comment, Inbox, Message, Prisma } from '@prisma/client';
import { SocketIO } from './socket.server';
import { RemoteSocket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { prisma } from './prisma.service';
import { UserService } from './user.service';

export class SocketService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  static async getFriendsList(socket: Socket) {
    if (!socket.data.user || !socket.data.user.id) return; //Guest/Unauthorized user trying to access data.
    const id = socket.data.user.id;
    const friends = await prisma.user.findUnique({
      where: { id },
      select: {
        friends: { select: { id: true, username: true, avatarUrl: true } },
      },
    });
    const inboxes = await prisma.inbox.findMany({
      where: { participants: { some: { userId: id } } },
      include: {
        participants: {
          include: {
            user: { select: { id: true, avatarUrl: true, username: true } },
          },
        },
        messages: true,
      },
    });
    const filteredInboxes: PartialInbox[] = [];

    for (let i = 0; i < inboxes.length; i++) {
      const inbox = inboxes[i];
      if (inbox.participants.length === 1) continue; //Shouldnt occur but checked for
      const participant = inbox.participants.find((user) => user.userId !== id);

      filteredInboxes.push({
        id: inbox.id,
        lastMessage: inbox.lastMessage,
        lastSenderId: inbox.lastSenderId,
        read: inbox.read,
        user: {
          id: participant.userId,
          username: participant.user.username,
          avatarUrl: participant.user.avatarUrl,
          online: false,
        },
        messages: inbox.messages,
      });
    }

    socket.emit('friends_list', {
      friends: friends.friends,
      inbox: filteredInboxes,
    });
  }

  static async processMessage(
    socket: Socket,
    username: string,
    content: string
  ) {
    if (!socket.data.user || !socket.data.user.id) return; //Guest/Unauthorized user trying to access data.
    const id = socket.data.user.id;
    const targetUser = await UserService.getUser(username);
    if (!targetUser) return;
    //Should only return one
    const inbox = await prisma.inbox.findFirst({
      where: {
        participants: { every: { userId: { in: [id, targetUser.id] } } },
      },
      include: {
        messages: true,
      },
    });

    if (!inbox) {
      await prisma.inbox.create({
        data: {
          participants: {
            createMany: { data: [{ userId: id }, { userId: targetUser.id }] },
          },
          messages: {
            create: {
              userId: id,
              content,
            },
          },
          lastMessage: content,
          lastSenderId: id,
          read: false,
        },
        include: { messages: true },
      });
    } else {
      await prisma.inbox.update({
        where: { id: inbox.id },
        data: {
          messages: { create: { userId: id, content } },
          lastMessage: content,
          lastSenderId: id,
          read: false,
        },
        include: { messages: true },
      });
    }

    this.refreshInbox(socket, id);
    this.refreshInbox(socket, targetUser.id);
  }

  private static async refreshInbox(socket: Socket, userId: number) {
    if (!socket.data.user || !socket.data.user.id) return; //Guest/Unauthorized user trying to access data.

    const inboxes = await prisma.inbox.findMany({
      where: { participants: { some: { userId } } },
      include: {
        participants: {
          include: {
            user: { select: { id: true, avatarUrl: true, username: true } },
          },
        },
        messages: true,
      },
    });
    const filteredInboxes: PartialInbox[] = [];

    for (let i = 0; i < inboxes.length; i++) {
      const inbox = inboxes[i];
      if (inbox.participants.length === 1) continue; //Shouldnt occur but checked for
      const participant = inbox.participants.find(
        (user) => user.userId !== userId
      );

      filteredInboxes.push({
        id: inbox.id,
        lastMessage: inbox.lastMessage,
        lastSenderId: inbox.lastSenderId,
        read: inbox.read,
        user: {
          id: participant.userId,
          username: participant.user.username,
          avatarUrl: participant.user.avatarUrl,
          online: false,
        },
        messages: inbox.messages,
      });
    }

    this.emitAll(userId, 'update_inbox', filteredInboxes);
  }

  static async getUserConnectedSockets(userId: number): Promise<Socket[]> {
    const sockets = await SocketIO.server.sockets.fetchSockets();
    const userSockets: Socket[] = [];
    sockets.forEach((sock: RemoteSocket<DefaultEventsMap, SocketData>) => {
      const validSocket = SocketIO.server.sockets.sockets.get(
        sock.id
      ) as Socket;

      if (validSocket.data.user?.id === userId) userSockets.push(validSocket);
    });

    return userSockets;
  }

  static async emitAll(userId: number, event: string, data: unknown) {
    const sockets = await this.getUserConnectedSockets(userId);
    if (!sockets) return;

    sockets.forEach((sock) => {
      sock.emit(event, data);
    });
  }
}

import { Comment, Prisma } from '@prisma/client';
import { SocketService } from 'libs/api/services/src/lib/socket.service';
import { prisma } from './prisma.service';
import { UserService } from './user.service';

export class CommentsService {
  static async getComments(
    username: string,
    page?: number
  ): Promise<Comment[]> {
    const userId = await UserService.userIdFromName(username);
    if (!userId) return null;

    const comments = await prisma.comment.findMany({
      where: { toUserId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (page) {
      //Handle Page Stuff
    }

    return comments;
  }

  static async createComment(
    username: string,
    authorId: number,
    message: string
  ): Promise<Comment> {
    const userId = await UserService.userIdFromName(username);

    //TODO: Add Check if User is Blocked?

    const comment = await prisma.comment.create({
      data: { authorId, toUserId: userId, content: message },
    });

    return comment;
  }

  static async editComment(
    id: number,
    content: string,
    userId: number
  ): Promise<boolean> {
    const comment = await this.getComment(id);
    if (comment.authorId !== userId) return false;

    await prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    return true;
  }

  static async deleteComment(id: number, userId: number): Promise<boolean> {
    const comment = await this.getComment(id);
    if (comment.authorId !== userId) return false;

    await prisma.comment.delete({
      where: { id },
    });

    return true;
  }

  static async interactComment(
    id: number,
    upvote: boolean,
    userId: number
  ): Promise<number> {
    const comment = await this.getComment(id);
    const curVal = comment.likes - comment.dislikes;
    if (comment.authorId !== userId) return curVal;

    const newValue = upvote ? curVal + 1 : curVal - 1; //Checks if user upvoted and increments
    const data: Prisma.CommentUpdateInput = upvote
      ? { likes: { increment: 1 } }
      : { dislikes: { increment: 1 } };

    await prisma.comment.update({
      where: { id },
      data,
    });

    return newValue;
  }

  private static async getComment(id: number): Promise<Comment> {
    return await prisma.comment.findUnique({ where: { id } });
  }
}

interface ICommentsService {
  getComments(username: string, page?: number): Promise<Comment[]>;
  createComment(
    username: string,
    authorId: number,
    message: string
  ): Promise<Comment>;
  editComment(id: number, content: string, userId: number): Promise<boolean>;
  deleteComment(id: number, userId: number): Promise<boolean>;
  interactComment(id: number, upvote: boolean, userId: number): Promise<number>;
}

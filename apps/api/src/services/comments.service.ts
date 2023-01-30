import { PublicUser } from '@couragames/shared-types';
import { PrismaClient, Comment, User } from '@prisma/client';
import { UserService } from './user.service';

export class CommentsService implements ICommentsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private prisma: PrismaClient;
  constructor(private userService: UserService) {
    this.prisma = new PrismaClient();
  }

  async getComments(username: string, page?: number): Promise<Comment[]> {
    const userId = await this.userService.userIdFromName(username);
    const comments = await this.prisma.comment.findMany({
      where: { toUserId: userId, deleted: false },
      orderBy: { createdAt: 'desc' },
    });

    return comments;
  }

  async editComment(
    id: number,
    content: string,
    userId: number
  ): Promise<boolean> {
    const comment = await this.getComment(id);
    if (comment.fromUserId !== userId) return false;

    await this.prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    return true;
  }

  async deleteComment(id: number, userId: number): Promise<boolean> {
    const comment = await this.getComment(id);
    if (comment.fromUserId !== userId) return false;

    await this.prisma.comment.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });

    return true;
  }

  interactComment(id: string, upvote: boolean): Promise<number> {
    throw new Error('Method not implemented.');
  }

  private async getComment(id: number): Promise<Comment> {
    return await this.prisma.comment.findUnique({ where: { id } });
  }
}

interface ICommentsService {
  getComments(userId: string, page?: number): Promise<Comment[]>;
  editComment(id: number, content: string, userId: number): Promise<boolean>;
  deleteComment(id: number, userId: number): Promise<boolean>;
  interactComment(id: string, upvote: boolean): Promise<number>;
}

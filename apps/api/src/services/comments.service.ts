import { PublicUser } from '@couragames/shared-types';
import { PrismaClient, Comment, User, Prisma } from '@prisma/client';
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
      where: { toUserId: userId },
      orderBy: { createdAt: 'desc' },
    });

    return comments;
  }

  async createComment(
    username: string,
    authorId: number,
    message: string
  ): Promise<Comment> {
    const userId = await this.userService.userIdFromName(username);

    //TODO: Add Check if User is Blocked?

    const comment = await this.prisma.comment.create({
      data: { authorId, toUserId: userId, content: message },
    });

    return comment;
  }

  async editComment(
    id: number,
    content: string,
    userId: number
  ): Promise<boolean> {
    const comment = await this.getComment(id);
    if (comment.authorId !== userId) return false;

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
    if (comment.authorId !== userId) return false;

    await this.prisma.comment.delete({
      where: { id },
    });

    return true;
  }

  async interactComment(
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

    await this.prisma.comment.update({
      where: { id },
      data,
    });

    return newValue;
  }

  private async getComment(id: number): Promise<Comment> {
    return await this.prisma.comment.findUnique({ where: { id } });
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

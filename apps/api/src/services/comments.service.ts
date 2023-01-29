import { PublicUser } from '@couragames/shared-types';
import { PrismaClient, Comment } from '@prisma/client';
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

  editComment(id: string, content: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  interactComment(id: string, upvote: boolean): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

interface ICommentsService {
  getComments(userId: string, page?: number): Promise<Comment[]>;
  editComment(id: string, content: string): Promise<void>;
  deleteComment(id: string): Promise<void>;
  interactComment(id: string, upvote: boolean): Promise<number>;
}

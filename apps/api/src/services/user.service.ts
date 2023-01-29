import { PublicUser } from '@couragames/shared-types';
import { PrismaClient, User } from '@prisma/client';

export class UserService implements IUserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser(username: string): Promise<PublicUser> {
    //FindUnique doesnt support insensitive mode
    const user = await this.prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: {
        //Grab Specific Fields to ensure we dont send back private data.
        id: true,
        username: true,
        status: true,
        avatarUrl: true,
        profileBanner: true,
        points: true,
        joined: true,
      },
    });

    return { ...user, joined: user.joined.getTime() };
  }
}

interface IUserService {
  getUser(username: string): Promise<PublicUser>;
}

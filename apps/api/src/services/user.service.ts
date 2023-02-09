import { PublicUser } from '@couragames/shared-types';
import { PrismaClient, User } from '@prisma/client';
import { BlockBlobClient } from '@azure/storage-blob';
import fileUpload = require('express-fileupload');
import prisma from './prisma.service';
export class UserService implements IUserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getUser(username: string): Promise<PublicUser> {
    //FindUnique doesnt support insensitive mode
    const user = await prisma.user.findFirst({
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

    // user.avatarUrl = `${process.env.FILE_HOST}/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${user.avatarUrl}`;

    return { ...user, joined: user.joined.getTime() };
  }

  async updateUser(userId: number, files: fileUpload.FileArray) {
    console.log('Here');

    if (!files || !files.avatar) return null;
    if (Array.isArray(files.avatar)) return null;

    const avatar = files.avatar;
    console.log(avatar);
    console.log(avatar.data);

    //Code from Official Azure Github page for examples on how to use there services.
    //Changed function below to use uploadData instead
    //https://github.com/Azure-Samples/storage-blob-upload-from-webapp-node/blob/master/routes/upload.js

    const blobName = getBlobName(avatar.name),
      blobService = new BlockBlobClient(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
        process.env.AZURE_STORAGE_CONTAINER_NAME,
        blobName
      );

    blobService.uploadData(avatar.data).catch((err) => {
      console.log(err);
      return null;
    });

    await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: blobName },
    });
  }

  async userIdFromName(username: string) {
    const user = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: {
        //Grab Specific Fields to ensure we dont send back private data.
        id: true,
      },
    });

    return user.id;
  }

  async getManyUsers(userIds: number[]) {
    //Make sure Input array is unique
    userIds = [...new Set(userIds)];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, avatarUrl: true },
    });

    return users;
  }
}

const getBlobName = (originalName: string) => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

interface IUserService {
  getUser(username: string): Promise<PublicUser>;
  userIdFromName(username: string): Promise<number>;
}

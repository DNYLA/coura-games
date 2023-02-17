import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//This Prisma middleware will check for any fetches/gets to the user table and automatically parse
//any avatarUrl (if provided) to contain the url where the file is hosted e.g fileName.png -> https://www.imagestorage.com/avatars/fileName.png
prisma.$use(async (params, next) => {
  if (params.model !== 'User') return next(params);
  const result = await next(params);

  if (
    params.action === 'findUnique' ||
    params.action === 'findFirst' ||
    params.action === 'update'
  ) {
    if (!result || !result.avatarUrl) return result;
    result.avatarUrl = `${process.env.FILE_HOST}/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${result.avatarUrl}`;

    return result;
  } else if (params.action === 'findMany') {
    const parsed = result.map((res) => {
      if (!res.avatarUrl) return res;
      return {
        ...res,
        avatarUrl: `${process.env.FILE_HOST}/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${res.avatarUrl}`,
      };
    });

    return parsed;
  }

  return result;
});

export { prisma };

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
    if (isValidUrl(result.avatarUrl)) return result;
    result.avatarUrl = `${process.env.FILE_HOST}/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${result.avatarUrl}`;

    return result;
  } else if (params.action === 'findMany') {
    const parsed = result.map((res) => {
      if (!res.avatarUrl) return res;
      if (isValidUrl(res.avatarUrl)) return res;
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

//https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/#:~:text=checkValidity()%20method%20is%20used,is%20not%20a%20proper%20URL.
function isValidUrl(urlString: string) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

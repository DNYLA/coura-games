import { GameType, Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  const userQueries: string | any[] = [];
  for (let i = 0; i < 500; i++) {
    const statObject: Prisma.JsonValue = {};

    Object.keys(GameType).map((type) => {
      statObject[type] = Math.floor(Math.random() * 1500);
    });

    userQueries.push(
      prisma.user.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          avatarUrl: faker.internet.avatar(),
          status: faker.company.catchPhrase(),
          stats: statObject,
        },
      })
    );
  }

  await prisma.$transaction(userQueries);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

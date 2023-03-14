-- CreateTable
CREATE TABLE "Friend" (
    "id" INTEGER NOT NULL,
    "userOneId" INTEGER NOT NULL,
    "userTwoId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("userOneId","userTwoId")
);

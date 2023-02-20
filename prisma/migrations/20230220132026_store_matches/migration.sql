/*
  Warnings:

  - You are about to drop the column `deleted` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `fromUserId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatarUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Accepted', 'Rejected', 'Pending', 'Blocked');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FriendRequest', 'SelfComment', 'FriendComment');

-- CreateEnum
CREATE TYPE "Game" AS ENUM ('RPS', 'TicTacToe');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "deleted",
DROP COLUMN "deletedAt",
DROP COLUMN "fromUserId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" SET NOT NULL,
ALTER COLUMN "avatarUrl" SET DEFAULT 'default.png';

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "matchId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "points" INTEGER NOT NULL,
    "prevPoints" INTEGER NOT NULL,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("matchId","userId")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "playback" JSONB,
    "type" "Game" NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

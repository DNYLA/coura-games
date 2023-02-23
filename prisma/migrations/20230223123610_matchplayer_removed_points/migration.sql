/*
  Warnings:

  - You are about to drop the column `points` on the `MatchPlayer` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('RPS', 'TicTacToe');

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "type",
ADD COLUMN     "type" "GameType" NOT NULL;

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "points";

-- DropEnum
DROP TYPE "GameTypes";

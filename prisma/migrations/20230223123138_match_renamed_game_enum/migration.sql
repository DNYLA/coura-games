/*
  Warnings:

  - Changed the type of `type` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameTypes" AS ENUM ('RPS', 'TicTacToe');

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "type",
ADD COLUMN     "type" "GameTypes" NOT NULL;

-- DropEnum
DROP TYPE "Game";

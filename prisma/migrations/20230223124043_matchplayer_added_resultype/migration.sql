/*
  Warnings:

  - You are about to drop the column `winner` on the `MatchPlayer` table. All the data in the column will be lost.
  - Added the required column `result` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Result" AS ENUM ('Win', 'Loss', 'Draw');

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "winner",
ADD COLUMN     "result" "Result" NOT NULL;

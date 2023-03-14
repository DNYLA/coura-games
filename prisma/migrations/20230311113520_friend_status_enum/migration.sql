/*
  Warnings:

  - The `status` column on the `Friend` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "status",
ADD COLUMN     "status" "FriendStatus" NOT NULL DEFAULT 'Pending';

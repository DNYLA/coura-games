/*
  Warnings:

  - The values [Blocked] on the enum `FriendStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FriendRequest,GameInvite] on the enum `NotificationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SelfComment,FriendComment] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendStatus_new" AS ENUM ('Accepted', 'Rejected', 'Pending');
ALTER TABLE "FriendRequests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "FriendRequests" ALTER COLUMN "status" TYPE "FriendStatus_new" USING ("status"::text::"FriendStatus_new");
ALTER TYPE "FriendStatus" RENAME TO "FriendStatus_old";
ALTER TYPE "FriendStatus_new" RENAME TO "FriendStatus";
DROP TYPE "FriendStatus_old";
ALTER TABLE "FriendRequests" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationStatus_new" AS ENUM ('Unread', 'Read', 'Cancelled');
ALTER TABLE "Notification" ALTER COLUMN "status" TYPE "NotificationStatus_new" USING ("status"::text::"NotificationStatus_new");
ALTER TYPE "NotificationStatus" RENAME TO "NotificationStatus_old";
ALTER TYPE "NotificationStatus_new" RENAME TO "NotificationStatus";
DROP TYPE "NotificationStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('FriendRequest', 'ProfileComment', 'Invite');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "action" TEXT;

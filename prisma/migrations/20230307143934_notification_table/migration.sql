-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Unread', 'Read', 'FriendRequest', 'GameInvite', 'Cancelled');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "targetId" INTEGER NOT NULL,
    "fromId" INTEGER,
    "type" "NotificationType" NOT NULL,
    "status" "NotificationStatus" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

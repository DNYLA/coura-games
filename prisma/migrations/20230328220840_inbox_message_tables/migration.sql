-- CreateTable
CREATE TABLE "Inbox" (
    "id" SERIAL NOT NULL,
    "lastMessage" TEXT NOT NULL,
    "lastSenderId" INTEGER NOT NULL,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboxParticipants" (
    "inboxId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InboxParticipants_pkey" PRIMARY KEY ("inboxId","userId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "inboxId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InboxParticipants" ADD CONSTRAINT "InboxParticipants_inboxId_fkey" FOREIGN KEY ("inboxId") REFERENCES "Inbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_inboxId_fkey" FOREIGN KEY ("inboxId") REFERENCES "Inbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

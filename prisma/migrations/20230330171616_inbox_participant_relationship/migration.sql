-- AddForeignKey
ALTER TABLE "InboxParticipants" ADD CONSTRAINT "InboxParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

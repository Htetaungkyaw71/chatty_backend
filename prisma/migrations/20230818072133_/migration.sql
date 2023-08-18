-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_belongToId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

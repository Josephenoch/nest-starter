-- DropForeignKey
ALTER TABLE "BookMark" DROP CONSTRAINT "BookMark_userID_fkey";

-- AddForeignKey
ALTER TABLE "BookMark" ADD CONSTRAINT "BookMark_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

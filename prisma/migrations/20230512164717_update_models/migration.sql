/*
  Warnings:

  - Added the required column `userID` to the `Boomark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boomark" ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Boomark" ADD CONSTRAINT "Boomark_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

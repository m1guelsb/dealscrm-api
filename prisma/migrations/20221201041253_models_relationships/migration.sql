/*
  Warnings:

  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dealId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dealId" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

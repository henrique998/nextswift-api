/*
  Warnings:

  - You are about to drop the column `employeeId` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "employeeId",
ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

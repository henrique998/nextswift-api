/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_purchaseId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "purchaseId";

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

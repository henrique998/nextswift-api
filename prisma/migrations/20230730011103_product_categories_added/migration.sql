/*
  Warnings:

  - You are about to drop the column `productId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_productId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "products-categories" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "products-categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products-categories" ADD CONSTRAINT "products-categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products-categories" ADD CONSTRAINT "products-categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

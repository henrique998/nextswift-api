/*
  Warnings:

  - Added the required column `name` to the `product-images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `product-images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product-images" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

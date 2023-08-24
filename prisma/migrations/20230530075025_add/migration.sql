/*
  Warnings:

  - Added the required column `productsQty` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "productsQty" INTEGER NOT NULL;

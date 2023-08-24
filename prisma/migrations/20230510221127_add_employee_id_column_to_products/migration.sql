/*
  Warnings:

  - Added the required column `employeeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "employeeId" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `ddd` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ddd` on the `suppliers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "ddd";

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "ddd";

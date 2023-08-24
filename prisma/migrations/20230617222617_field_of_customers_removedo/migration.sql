/*
  Warnings:

  - You are about to drop the column `cnpj` on the `customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customers_cnpj_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "cnpj";

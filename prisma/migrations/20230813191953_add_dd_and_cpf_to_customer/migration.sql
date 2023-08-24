/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ddd` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "ddd" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_cpf_key" ON "employees"("cpf");

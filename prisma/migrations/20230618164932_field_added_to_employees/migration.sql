/*
  Warnings:

  - Added the required column `gender` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "gender" "Gender" NOT NULL;

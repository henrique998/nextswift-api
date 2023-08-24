/*
  Warnings:

  - You are about to drop the `employees-roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees-roles" DROP CONSTRAINT "employees-roles_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employees-roles" DROP CONSTRAINT "employees-roles_role_id_fkey";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "roleId" TEXT;

-- DropTable
DROP TABLE "employees-roles";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `employeeId` on the `roles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_employeeId_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "employees-roles" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "employees-roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees-roles" ADD CONSTRAINT "employees-roles_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees-roles" ADD CONSTRAINT "employees-roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

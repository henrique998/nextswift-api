import { DismissEmployeeUseCase } from '@app/useCases/employees/DismissEmployeeUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  adminPassword: z.string(),
  employeeId: z.string().uuid(),
})

export class DismissEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: adminId } = req.employee
    const { adminPassword, employeeId } = bodySchema.parse(req.body)

    const employeesRepo = new PrismaEmployeesRepository()
    const dismissEmployeeUseCase = new DismissEmployeeUseCase(employeesRepo)

    await dismissEmployeeUseCase.execute({
      adminId,
      adminPassword,
      employeeId,
    })

    return res.json({ message: 'Employee Dismissd!' })
  }
}

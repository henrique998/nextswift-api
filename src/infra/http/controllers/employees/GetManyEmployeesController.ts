import { GetManyEmployeesUseCase } from '@app/useCases/employees/GetManyEmployeesUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { EmployeeViewModel } from '@infra/http/viewModels/EmployeeViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})

export class GetManyEmployeesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = querySchema.parse(req.query)
    const { id: employeeId } = req.employee

    const employeesRepo = new PrismaEmployeesRepository()
    const getManyEmployeesUseCase = new GetManyEmployeesUseCase(employeesRepo)

    const result = await getManyEmployeesUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      employeeId,
    })

    const employees = result.employees.map((employee) =>
      EmployeeViewModel.toHttp(employee, employee.role!!),
    )

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', String(employees.length))

    return res.json(employees)
  }
}

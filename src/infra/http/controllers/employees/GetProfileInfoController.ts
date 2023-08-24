import { GetProfileInfoUseCase } from '@app/useCases/employees/GetProfileInfoUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { PrismaRolesRepository } from '@infra/database/prisma/repositories/PrismaRolesRepository'
import { EmployeeViewModel } from '@infra/http/viewModels/EmployeeViewModel'
import { Request, Response } from 'express'

export class GetProfileInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.employee

    const employeesRepo = new PrismaEmployeesRepository()
    const rolesRepo = new PrismaRolesRepository()
    const getProfileInfoUseCase = new GetProfileInfoUseCase(
      employeesRepo,
      rolesRepo,
    )

    const result = await getProfileInfoUseCase.execute(id)

    const employee = EmployeeViewModel.toHttp(result.employee, result.roles)

    return res.json(employee)
  }
}

import { UpdateEmployeeInfoUseCase } from '@app/useCases/employees/UpdateEmployeeInfoUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { EmployeeViewModel } from '@infra/http/viewModels/EmployeeViewModel'
import { S3StorageProvider } from '@infra/providers/storage/S3StorageProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.coerce.number(),
})

export class UpdateEmployeeInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: employeeId } = req.employee
    const { name, email, phone } = bodySchema.parse(req.body)
    const avatar = req.file?.filename

    const employeesRepo = new PrismaEmployeesRepository()
    const storageProvider = new S3StorageProvider()
    const updateEmployeeInfoUseCase = new UpdateEmployeeInfoUseCase(
      employeesRepo,
      storageProvider,
    )

    const result = await updateEmployeeInfoUseCase.execute({
      employeeId,
      name,
      email,
      phone,
      avatar,
    })

    const employee = EmployeeViewModel.toHttp(
      result.employee,
      result.employee.role,
    )

    return res.json(employee)
  }
}

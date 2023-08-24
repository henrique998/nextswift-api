import { Request, Response } from 'express'
import { z } from 'zod'

import { HireEmployeeUseCase } from '@app/useCases/employees/HireEmployeeUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { MailtrapMailProvider } from '@infra/providers/email/MailtrapMailProvider'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  ddd: z.coerce.number(),
  phone: z.coerce.number(),
  cpf: z.string(),
  role: z.string(),
})

export class HireEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, ddd, phone, cpf, role } = bodySchema.parse(req.body)
    const avatar = req.file?.filename

    const employeesRepository = new PrismaEmployeesRepository()
    const mailProvider = new MailtrapMailProvider()

    const hireEmployeeUseCase = new HireEmployeeUseCase(
      employeesRepository,
      mailProvider,
    )

    await hireEmployeeUseCase.execute({
      name,
      email,
      ddd,
      phone,
      cpf,
      avatar: avatar ?? null,
      roleId: role,
    })

    return res.status(201).json({ message: 'Employee Hired!' })
  }
}

import { SessionUseCase } from '@app/useCases/session/SessionUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { PrismaTokensRepository } from '@infra/database/prisma/repositories/PrismaTokensRepository'
import { EmployeeViewModel } from '@infra/http/viewModels/EmployeeViewModel'
import { DayjsDateProvider } from '@infra/providers/date/DayjsDateProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export class SessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = bodySchema.parse(req.body)

    const employeesRepository = new PrismaEmployeesRepository()
    const tokensRepo = new PrismaTokensRepository()
    const dateProvider = new DayjsDateProvider()
    const sessionUseCase = new SessionUseCase(
      employeesRepository,
      tokensRepo,
      dateProvider,
    )

    const { token, refreshToken, employee } = await sessionUseCase.execute({
      email,
      password,
    })

    return res.json({
      token,
      refreshToken,
      employee: EmployeeViewModel.toHttp(employee, employee.role!!),
    })
  }
}

import { ResetPasswordUseCase } from '@app/useCases/employees/ResetPasswordUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { PrismaTokensRepository } from '@infra/database/prisma/repositories/PrismaTokensRepository'
import { DayjsDateProvider } from '@infra/providers/date/DayjsDateProvider'
import { Request, Response } from 'express'

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { newPassword } = req.body
    const { code } = req.query

    const employeesRepo = new PrismaEmployeesRepository()
    const tokensRepo = new PrismaTokensRepository()
    const dateProvider = new DayjsDateProvider()

    const resetPasswordUseCase = new ResetPasswordUseCase(
      employeesRepo,
      tokensRepo,
      dateProvider,
    )

    await resetPasswordUseCase.execute({ newPassword, code: String(code) })

    return res.status(204).json({ message: 'Password updated successfuly!' })
  }
}

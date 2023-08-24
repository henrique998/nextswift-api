import { SendForgotPasswordMailUseCase } from '@app/useCases/employees/SendForgotPasswordMailUseCase'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { PrismaTokensRepository } from '@infra/database/prisma/repositories/PrismaTokensRepository'
import { DayjsDateProvider } from '@infra/providers/date/DayjsDateProvider'
import { MailtrapMailProvider } from '@infra/providers/email/MailtrapMailProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string(),
})

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = bodySchema.parse(req.body)

    const employeesRepo = new PrismaEmployeesRepository()
    const tokensRepo = new PrismaTokensRepository()
    const mailProvider = new MailtrapMailProvider()
    const dateProvider = new DayjsDateProvider()

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      employeesRepo,
      tokensRepo,
      dateProvider,
      mailProvider,
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return res.json({ message: 'email sent successfully!' })
  }
}

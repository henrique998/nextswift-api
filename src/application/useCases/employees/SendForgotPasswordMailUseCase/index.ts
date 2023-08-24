import { Token } from '@app/entities/Token'
import { AppError } from '@app/errors/AppError'
import { IDateProvider } from '@app/providers/IDateProvider'
import { IMailProvider } from '@app/providers/IMailProvider'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { ITokensRepository } from '@app/repositories/ITokensRepository'
import { env } from '@infra/env'
import { randomUUID } from 'crypto'
import { resolve } from 'path'

type Response = void

export class SendForgotPasswordMailUseCase {
  constructor(
    private employeesRepo: IEmployeesRepository,
    private tokensRepo: ITokensRepository,
    private dateProvider: IDateProvider,
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<Response> {
    const employee = await this.employeesRepo.findByEmail(email)

    if (!employee) {
      throw new AppError('Employee not found!')
    }

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'infra',
      'views',
      'emails',
      'forgotPassword.hbs',
    )

    const token = randomUUID()

    const employeeToken = new Token({
      employeeId: employee.id,
      refreshToken: token,
      expiresDate: this.dateProvider.add(3, 'hours'),
    })

    await this.tokensRepo.create(employeeToken)

    const variables = {
      name: employee.name,
      link: `${env.FORGOT_MAIL_URL}${token}`,
    }

    this.mailProvider.sendMail({
      to: email,
      subject: 'Reset de senha',
      path: templatePath,
      variables,
    })
  }
}

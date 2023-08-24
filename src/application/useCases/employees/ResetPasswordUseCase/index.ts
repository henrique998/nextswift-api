import { Password } from '@app/entities/Employee/Password'
import { AppError } from '@app/errors/AppError'
import { EmployeeNotFoundError } from '@app/errors/EmployeeNotFound'
import { IDateProvider } from '@app/providers/IDateProvider'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { ITokensRepository } from '@app/repositories/ITokensRepository'
import { hash } from 'bcryptjs'

interface Request {
  code: string
  newPassword: string
}

type Response = void

export class ResetPasswordUseCase {
  constructor(
    private employeesRepo: IEmployeesRepository,
    private tokensRepo: ITokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({ code, newPassword }: Request): Promise<Response> {
    if (!code || !newPassword) {
      throw new AppError('code and new password must be provided!')
    }

    const token = await this.tokensRepo.findByRefreshToken(code)

    if (!token) {
      throw new AppError('invalid token!')
    }

    const isTokenExpired = this.dateProvider.isBefore(
      token.expiresDate,
      this.dateProvider.now(),
    )

    if (isTokenExpired) {
      throw new AppError('Token expired!')
    }

    const hashedNewPassword = await hash(newPassword, 8)

    const employee = await this.employeesRepo.findById(token.employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    employee.password = new Password(hashedNewPassword)
    employee.update()

    await this.employeesRepo.save(employee)

    await this.tokensRepo.delete(token.id)
  }
}

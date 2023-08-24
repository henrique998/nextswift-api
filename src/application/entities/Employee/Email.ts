import { AppError } from '@app/errors/AppError'

export class Email {
  private readonly email: string

  constructor(email: string) {
    const isEmailValid = this.isValid(email)

    if (!isEmailValid) {
      throw new AppError('E-mail address is not valid!')
    }

    this.email = email
  }

  private isValid(email: string): boolean {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.(com|com\.br)$/

    return emailRegex.test(email)
  }

  get value(): string {
    return this.email
  }
}

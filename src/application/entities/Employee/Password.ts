import { AppError } from '@app/errors/AppError'

export class Password {
  private readonly password: string

  constructor(password: string) {
    const isPasswordValid = this.isValid(password)

    if (!isPasswordValid) {
      throw new AppError('Password is not valid')
    }

    this.password = password
  }

  private isValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

    return passwordRegex.test(password)
  }

  get value(): string {
    return this.password
  }
}

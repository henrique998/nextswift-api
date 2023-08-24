import { AppError } from '@app/errors/AppError'

export class Cep {
  private readonly cep: string

  constructor(cep: string) {
    const isCepValid = this.isValid(cep)

    if (!isCepValid) {
      throw new AppError('cep is invalid!')
    }

    this.cep = cep
  }

  private isValid(cep: string): boolean {
    const cepRegex = /^[0-9]{5}-[\d]{3}$/

    return cepRegex.test(cep)
  }

  get value(): string {
    return this.cep
  }
}

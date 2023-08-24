import { AppError } from '@app/errors/AppError'

export class Cnpj {
  private readonly cnpj: string

  constructor(cnpj: string) {
    const isCnpjValid = this.isValid(cnpj)

    if (!isCnpjValid) {
      throw new AppError('Cnpj is invalid!')
    }

    this.cnpj = cnpj
  }

  private isValid(cnpj: string): boolean {
    if (!cnpj) {
      return false
    }

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\\-\d{2}$/

    return cnpjRegex.test(cnpj)
  }

  get value(): string {
    return this.cnpj
  }
}

import { AppError } from '@app/errors/AppError'

export class Cpf {
  private readonly cpf: string

  constructor(cpf: string) {
    const isCpfValid = this.isValid(cpf)

    if (!isCpfValid) {
      throw new AppError('Cpf is invalid!')
    }

    this.cpf = cpf
  }

  private isValid(cpf: string): boolean {
    const cpfRegex =
      /^(?!000\.?0*000\.?0*000-?0*$|111\.?1*111\.?1*111-?1*$|222\.?2*222\.?2*222-?2*$|333\.?3*333\.?3*333-?3*$|444\.?4*444\.?4*444-?4*$|555\.?5*555\.?5*555-?5*$|666\.?6*666\.?6*666-?6*$|777\.?7*777\.?7*777-?7*$|888\.?8*888\.?8*888-?8*$|999\.?9*999\.?9*999-?9*$)\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/

    return cpfRegex.test(cpf)
  }

  get value(): string {
    return this.cpf
  }
}

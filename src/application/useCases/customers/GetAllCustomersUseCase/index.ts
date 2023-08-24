import { Customer } from '@app/entities/Customer'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Response {
  customers: Customer[]
}

export class GetAllCustomersUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute(): Promise<Response> {
    const customers = await this.customersRepo.findAll()

    return {
      customers,
    }
  }
}

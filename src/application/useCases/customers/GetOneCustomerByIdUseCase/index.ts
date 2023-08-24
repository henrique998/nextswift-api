import { Customer } from '@app/entities/Customer'
import { CustomerNotFoundError } from '@app/errors/CustomerNotFound'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Request {
  customerId: string
}

interface Response {
  customer: Customer
}

export class GetOneCustomerByIdUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute({ customerId }: Request): Promise<Response> {
    const customerExists = await this.customersRepo.findById(customerId)

    if (!customerExists) {
      throw new CustomerNotFoundError()
    }

    return {
      customer: customerExists,
    }
  }
}

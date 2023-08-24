import { AppError } from '@app/errors/AppError'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Request {
  customerId: string
}

type Response = void

export class RemoveCustomerUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute({ customerId }: Request): Promise<Response> {
    const customer = await this.customersRepo.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    customer.remove()

    await this.customersRepo.save(customer)
  }
}

import { Customer } from '@app/entities/Customer'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Request {
  page?: number
  limit?: number
}

interface Response {
  customers: Customer[]
  totalCount: number
}

export class GetManyCustomersUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute({ page = 1, limit = 10 }: Request): Promise<Response> {
    const res = await this.customersRepo.paginate({
      page,
      limit,
    })

    if (!res?.customers) {
      return {
        customers: [],
        totalCount: 0,
      }
    }

    return {
      customers: res.customers,
      totalCount: res.totalCount,
    }
  }
}

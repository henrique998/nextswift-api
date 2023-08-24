import { Supplier } from '@app/entities/Supplier'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'

interface Request {
  page?: number
  limit?: number
}

interface Response {
  suppliers: Supplier[]
  totalCount: number
}

export class GetManySuppliersUseCase {
  constructor(private suppliersRepo: ISuppliersRepository) {}

  async execute({ page = 1, limit = 10 }: Request): Promise<Response> {
    const res = await this.suppliersRepo.paginate({
      page,
      limit,
    })

    if (!res?.suppliers) {
      return {
        suppliers: [],
        totalCount: 0,
      }
    }

    return {
      suppliers: res.suppliers,
      totalCount: res.totalCount,
    }
  }
}

import { Purchase } from '@app/entities/Purchase'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'

interface Request {
  startDate: string
  endDate: string
  page?: number
  limit?: number
}

interface Response {
  purchases: Purchase[]
  totalCount: number
}

export class GetManyPurchasesUseCase {
  constructor(private purchasesRepo: IPurchasesRepository) {}

  async execute({
    startDate,
    endDate,
    page = 1,
    limit = 10,
  }: Request): Promise<Response> {
    const res = await this.purchasesRepo.paginate({
      startDate,
      endDate,
      page,
      limit,
    })

    if (!res?.purchases) {
      return {
        purchases: [],
        totalCount: 0,
      }
    }

    return {
      purchases: res.purchases,
      totalCount: res.totalCount,
    }
  }
}

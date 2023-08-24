import { Purchase } from '@app/entities/Purchase'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'

interface Request {
  searchDate: Date
}

interface Response {
  purchases: Purchase[]
}

export class GetPurchasesMetricsUseCase {
  constructor(
    private purchasesRepo: IPurchasesRepository,
    private productsRepo: IProductsRepository,
  ) {}

  async execute({ searchDate }: Request): Promise<Response> {
    const purchases = await this.purchasesRepo.search(searchDate)

    if (!purchases) {
      return {
        purchases: [],
      }
    }

    return { purchases }
  }
}

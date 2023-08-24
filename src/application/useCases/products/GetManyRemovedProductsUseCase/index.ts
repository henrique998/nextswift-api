import { Product } from '@app/entities/Product'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  page?: number
  limit?: number
}

interface Response {
  products: Product[]
}

export class GetManyRemovedProductsUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ page = 1, limit = 10 }: Request): Promise<Response> {
    const products = await this.productsRepo.paginateRemoved({ page, limit })

    if (!products) {
      return {
        products: [],
      }
    }

    return {
      products,
    }
  }
}

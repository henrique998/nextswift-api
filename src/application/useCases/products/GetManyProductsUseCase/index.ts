import { Product } from '@app/entities/Product'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
// import { Generate } from '@helpers/generate'
// import { redis } from '@infra/database/redis'

interface Request {
  page?: number
}

interface Response {
  products: Product[]
  totalCount: number
}

export class GetManyProductsUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ page = 0 }: Request): Promise<Response> {
    const res = await this.productsRepo.paginate({
      page,
    })

    if (!res?.products) {
      return {
        products: [],
        totalCount: 0,
      }
    }

    return {
      products: res.products,
      totalCount: res.totalCount,
    }
  }
}

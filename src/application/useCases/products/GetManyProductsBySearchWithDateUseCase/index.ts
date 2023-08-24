import { Product } from '@app/entities/Product'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Request {
  startDate: string
  endDate: string
  search: string
}

interface Response {
  products: Product[]
}

export class GetManyProductsBySearchWithDateUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ startDate, endDate, search }: Request): Promise<Response> {
    const cachedProducts = await redis.get('products:many:search')

    if (cachedProducts) {
      const parsedProducts = JSON.parse(cachedProducts)
      return {
        products: parsedProducts.map(Generate.product),
      }
    }

    const products = await this.productsRepo.searchWithDate({
      startDate,
      endDate,
      search,
    })

    await redis.set(
      'products:many:search',
      JSON.stringify(products?.map(Generate.redisProduct)),
      'EX',
      '20',
    )

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

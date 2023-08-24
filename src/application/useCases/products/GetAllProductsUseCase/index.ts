import { Product } from '@app/entities/Product'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Response {
  products: Product[]
}

export class GetAllProductsUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute(): Promise<Response> {
    const cachedProducts = await redis.get('products:all')

    if (cachedProducts) {
      const parsedProducts = JSON.parse(cachedProducts)

      return {
        products: parsedProducts.map(Generate.product),
      }
    }

    const products = await this.productsRepo.findAll()

    await redis.set(
      'products:all',
      JSON.stringify(products.map(Generate.redisProduct)),
      'EX',
      '20',
    )

    return {
      products,
    }
  }
}

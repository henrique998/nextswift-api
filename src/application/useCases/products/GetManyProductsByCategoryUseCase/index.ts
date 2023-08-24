import { Product } from '@app/entities/Product'
import { CategoryNotFound } from '@app/errors/CategoryNotFound'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Request {
  categoryId: string
  page?: number
}

interface Response {
  products: Product[]
  totalCount: number
}

export class GetManyProductsByCategoryUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private categoriesRepo: ICategoriesRepository,
  ) {}

  async execute({ categoryId, page = 1 }: Request): Promise<Response> {
    const categoryExists = await this.categoriesRepo.findById(categoryId)

    if (!categoryExists) {
      throw new CategoryNotFound()
    }

    const cachedProducts = await redis.get('products:many:category')

    if (cachedProducts) {
      const parsedProducts = JSON.parse(cachedProducts)
      return {
        products: parsedProducts.products.map(Generate.product),
        totalCount: parsedProducts.totalCount,
      }
    }

    const res = await this.productsRepo.paginate({
      categoryId,
      page,
    })

    await redis.set(
      'products:many:category',
      JSON.stringify({
        products: res?.products.map(Generate.redisProduct),
        totalCount: res?.totalCount,
      }),
      'EX',
      '20',
    )

    if (!res?.products) {
      return {
        products: [],
        totalCount: 0,
      }
    }

    return {
      products: res?.products,
      totalCount: res?.totalCount,
    }
  }
}

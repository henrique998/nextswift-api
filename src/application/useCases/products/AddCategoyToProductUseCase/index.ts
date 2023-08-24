import { AppError } from '@app/errors/AppError'
import { ProductNotFound } from '@app/errors/ProductNotFound'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
  categoriesIds: string[]
}

type Response = void

export class AddCategoyToProductUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private categoriesRepo: ICategoriesRepository,
  ) {}

  async execute({ productId, categoriesIds }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new ProductNotFound()
    }

    const categories = await this.categoriesRepo.findManyByIds(categoriesIds)

    if (!categories) {
      throw new AppError('category or categories not found!', 404)
    }

    product.categories = categories.filter(
      (category) => !categoriesIds.includes(category.id),
    )

    product.update()

    await this.productsRepo.save(product)
  }
}

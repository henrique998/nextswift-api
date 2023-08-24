import { ProductNotFound } from '@app/errors/ProductNotFound'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
}

type Response = void

export class RestoreProductUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ productId }: Request): Promise<Response> {
    const productExists = await this.productsRepo.findRemovedById(productId)

    if (!productExists) {
      throw new ProductNotFound()
    }

    productExists.removedAt = null

    await this.productsRepo.save(productExists)
  }
}

import { AppError } from '@app/errors/AppError'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
  authorId: string
}

type Response = void

export class RemoveProductUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ productId, authorId }: Request): Promise<Response> {
    if (!productId || !authorId) {
      throw new AppError('Missing data!')
    }

    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const authorMatches = product.authorId === authorId

    if (!authorMatches) {
      throw new AppError('Unauthorized action!')
    }

    product.remove()

    await this.productsRepo.save(product)
  }
}

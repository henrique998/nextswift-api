import { ProductNotFound } from '@app/errors/ProductNotFound'
import { IProductImagesRepository } from '@app/repositories/IProductImagesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
  imagesIds: string[]
}

type Response = void

export class RemoveProductImagesUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private productImagesRepo: IProductImagesRepository,
  ) {}

  async execute({ imagesIds, productId }: Request): Promise<Response> {
    const productExists = await this.productsRepo.findById(productId)

    if (!productExists) {
      throw new ProductNotFound()
    }

    await this.productImagesRepo.delete(imagesIds, productId)
  }
}

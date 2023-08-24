import { ProductImage } from '@app/entities/ProductImage'
import { AppError } from '@app/errors/AppError'
import { IProductImagesRepository } from '@app/repositories/IProductImagesRepository'

interface Request {
  productId: string
}

interface Response {
  productImages: ProductImage[]
}

export class GetProductImagesUseCase {
  constructor(private productImagesRepo: IProductImagesRepository) {}

  async execute({ productId }: Request): Promise<Response> {
    const productImages = await this.productImagesRepo.findManyByProductId(
      productId,
    )

    if (!productImages) {
      throw new AppError('images not found!')
    }

    return {
      productImages,
    }
  }
}

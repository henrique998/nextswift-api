import { ProductImage } from '@app/entities/ProductImage'
import { ProductNotFound } from '@app/errors/ProductNotFound'
import { IStorageProvider } from '@app/providers/IStorageProvider'
import { IProductImagesRepository } from '@app/repositories/IProductImagesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
  images: Express.Multer.File[]
}

type Response = void

export class UploadProductImagesUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private productImagesRepo: IProductImagesRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ productId, images }: Request): Promise<Response> {
    const productExists = await this.productsRepo.findById(productId)

    if (!productExists) {
      throw new ProductNotFound()
    }

    const productImages = images.map((image) => {
      return new ProductImage({
        url: image.filename,
        name: image.originalname,
        size: image.size,
      })
    })

    await this.productImagesRepo.create(productImages, productId)

    for (const image of productImages) {
      await this.storageProvider.save(image.url, 'product')
    }
  }
}

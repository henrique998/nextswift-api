import { ProductImage } from '@app/entities/ProductImage'
import { IProductImagesRepository } from '@app/repositories/IProductImagesRepository'
import { prisma } from '..'
import { ProductImagesMapper } from '../mappers/ProductImagesMapper'

export class PrismaProductImagesRepository implements IProductImagesRepository {
  async findManyById(imageIds: string[]): Promise<ProductImage[] | null> {
    const images = await prisma.productImage.findMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    })

    if (!images) {
      return null
    }

    return images.map((image) => ProductImagesMapper.toDomain(image))
  }

  async findManyByProductId(productId: string): Promise<ProductImage[] | null> {
    const images = await prisma.productImage.findMany({
      where: {
        productId,
      },
    })

    if (!images) {
      return null
    }

    return images.map((image) => ProductImagesMapper.toDomain(image))
  }

  async create(images: ProductImage[], productId: string): Promise<void> {
    const raw = ProductImagesMapper.toPrisma(images, productId)

    await prisma.productImage.createMany({
      data: raw,
    })
  }

  async delete(imagesIds: string[], productId: string): Promise<void> {
    await prisma.productImage.deleteMany({
      where: {
        id: {
          in: imagesIds,
        },
        AND: {
          productId,
        },
      },
    })
  }
}

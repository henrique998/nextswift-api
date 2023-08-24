import { ProductImage } from '@app/entities/ProductImage'
import { ProductImage as RawProductImage } from '@prisma/client'

export class ProductImagesMapper {
  static toPrisma(
    images: ProductImage[],
    productId: string,
  ): RawProductImage[] {
    const productImages: RawProductImage[] = images.map((image) => {
      return {
        id: image.id,
        url: image.url,
        name: image.name,
        size: image.size,
        productId,
        createdAt: image.createdAt,
      }
    })

    return productImages
  }

  static toDomain(image: RawProductImage): ProductImage {
    return new ProductImage(
      {
        url: image.url,
        name: image.name,
        size: image.size,
        createdAt: image.createdAt,
      },
      image.id,
    )
  }
}

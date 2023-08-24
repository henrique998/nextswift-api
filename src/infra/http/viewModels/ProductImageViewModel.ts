import { ProductImage } from '@app/entities/ProductImage'
import { env } from '@infra/env'

export class ProductImageViewModel {
  static toHttp(image: ProductImage) {
    const sizeInKB = image.size / 1024
    const sizeInMB = sizeInKB / 1024

    return {
      id: image.id,
      url: `${env.STORAGE_BASE_URL}/product/${image.url}`,
      name: image.name,
      size:
        sizeInMB > 1
          ? `${Math.round(sizeInMB)} mb`
          : `${Math.round(sizeInKB)} kb`,
      createdAt: image.createdAt,
    }
  }
}

import { Product } from '@app/entities/Product'
import { env } from '@infra/env'
import { formatPrice } from '@infra/utils/formatPrice'

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
      id: product.id,
      name: product.name,
      excerpt: product.excerpt,
      description: product.description,
      width: product.width,
      height: product.height,
      quantity: product.quantity,
      weight: product.weight,
      price: formatPrice(product.price),
      categories: product.categories?.map((category) => {
        return {
          id: category.id,
          name: category.name,
        }
      }),
      images: product.images?.map((image) => {
        return {
          id: image.id,
          url: `${env.STORAGE_BASE_URL}/product/${image.url}`,
        }
      }),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      removedAt: product.removedAt,
    }
  }
}

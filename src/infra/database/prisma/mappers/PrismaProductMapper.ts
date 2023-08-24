import { Category } from '@app/entities/Category'
import { Product } from '@app/entities/Product'
import { ProductImage } from '@app/entities/ProductImage'
import {
  Product as RawProduct,
  ProductImage as RawProductImage,
} from '@prisma/client'

interface ProductData {
  product: RawProduct
  images: RawProductImage[]
  categories: {
    id: string
    name: string
    createdAt: Date
  }[]
}

export class PrismaProductMapper {
  static toPrisma(product: Product): RawProduct {
    return {
      id: product.id,
      name: product.name,
      excerpt: product.excerpt,
      description: product.description,
      width: product.width,
      height: product.height,
      price: product.price,
      quantity: product.quantity,
      weight: product.weight,
      authorId: product.authorId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
      removedAt: product.removedAt ?? null,
    }
  }

  static toDomain(data: ProductData): Product {
    const images = data.images.map(
      (image) =>
        new ProductImage(
          {
            url: image.url,
            name: image.name,
            size: image.size,
            createdAt: image.createdAt,
          },
          image.id,
        ),
    )

    const categories = data.categories.map(
      (category) =>
        new Category(
          {
            name: category.name,
            productsCount: null,
            createdAt: category.createdAt,
          },
          category.id,
        ),
    )

    return new Product(
      {
        name: data.product.name,
        excerpt: data.product.excerpt,
        description: data.product.description,
        width: data.product.width,
        height: data.product.height,
        weight: data.product.weight,
        price: data.product.price,
        quantity: data.product.quantity,
        authorId: data.product.authorId,
        images,
        categories,
        createdAt: data.product.createdAt,
        updatedAt: data.product.updatedAt,
        removedAt: data.product.removedAt,
      },
      data.product.id,
    )
  }
}

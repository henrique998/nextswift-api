import { Category } from '@app/entities/Category'
import { ProductNotFound } from '@app/errors/ProductNotFound'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
  name?: string
  excerpt?: string
  description?: string
  width?: number
  height?: number
  quantity?: number
  price?: string
  weight?: number
  categories?: string[]
}

type Response = void

export class UpdateProductUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private categoriesRepo: ICategoriesRepository,
  ) {}

  async execute(data: Request): Promise<Response> {
    const {
      productId,
      name,
      excerpt,
      description,
      width,
      height,
      quantity,
      price,
      weight,
      categories,
    } = data

    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new ProductNotFound()
    }

    product.name = name ?? product.name
    product.excerpt = excerpt ?? product.excerpt
    product.description = description ?? product.description
    product.width = width ?? product.width
    product.height = height ?? product.height
    product.quantity = quantity ?? product.quantity

    let categoriesData: Category[] = []

    if (categories) {
      const result = await this.categoriesRepo.findManyByIds(categories)

      categoriesData =
        result?.map(
          (category) =>
            new Category(
              {
                name: category.name,
                productsCount: category.productsCount,
                createdAt: category.createdAt,
              },
              category.id,
            ),
        ) ?? []
    }

    product.categories = categoriesData ?? product.categories

    const numericPrice = price?.replace(',', '.')
    const priceInCents = parseFloat(numericPrice ?? '') * 100

    product.price = priceInCents ?? product.price
    product.weight = weight ?? product.weight
    product.update()

    await this.productsRepo.save(product)
  }
}

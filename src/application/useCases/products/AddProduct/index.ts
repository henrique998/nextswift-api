import { Category } from '@app/entities/Category'
import { Product } from '@app/entities/Product'
import { ProductImage } from '@app/entities/ProductImage'
import { IBarCodeProvider } from '@app/providers/IBarCodeProvider'
import { IStorageProvider } from '@app/providers/IStorageProvider'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  name: string
  excerpt: string
  description: string
  width: number
  height: number
  quantity: number
  price: string
  weight: number
  images: Express.Multer.File[]
  categories?: string[]
  authorId: string
}

type Response = void

export class AddProductUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private categoriesRepo: ICategoriesRepository,
    private storageProvider: IStorageProvider,
    private barCodeProvider: IBarCodeProvider,
  ) {}

  async execute(data: Request): Promise<Response> {
    const {
      name,
      excerpt,
      description,
      width,
      height,
      quantity,
      weight,
      price,
      images,
      categories,
      authorId,
    } = data

    const productImages = images.map(
      (image) =>
        new ProductImage({
          url: image.filename,
          name: image.originalname,
          size: image.size,
        }),
    )

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

    const numericPrice = price.replace(',', '.')
    const priceInCents = parseFloat(numericPrice) * 100

    const product = new Product({
      name,
      excerpt,
      description,
      width,
      height,
      quantity,
      price: Math.round(priceInCents),
      categories: categoriesData,
      weight,
      images: productImages,
      authorId,
    })

    await this.productsRepo.create(product)

    if (product.images) {
      for (const image of product.images) {
        await this.storageProvider.save(image.url, 'product')
      }
    }

    await this.barCodeProvider.generate(product.id)
  }
}

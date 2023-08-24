import fs from 'node:fs'

import { Product } from '@app/entities/Product'
import { IProductsExcelProvider } from '@app/providers/IProductsExcelProvider'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  file: Express.Multer.File
  authorId: string
}

type Response = void

export class ImportProductUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private productsExcelProvider: IProductsExcelProvider,
  ) {}

  async execute({ file, authorId }: Request): Promise<Response> {
    const products = await this.productsExcelProvider.load(file)

    products.forEach(async (productData) => {
      const {
        name,
        excerpt,
        description,
        width,
        height,
        quantity,
        price,
        weight,
      } = productData

      const numericPrice = String(price).replace(',', '.')
      const priceInCents = parseFloat(numericPrice) * 100

      const product = new Product({
        name,
        excerpt,
        description,
        width,
        height,
        quantity,
        price: priceInCents,
        weight,
        authorId,
        images: null,
        categories: null,
      })

      await this.productsRepo.create(product)
    })

    await fs.promises.unlink(file.path)
  }
}

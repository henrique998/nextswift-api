import { Product } from '@app/entities/Product'
import { ProductNotFound } from '@app/errors/ProductNotFound'
import { IProductsRepository } from '@app/repositories/IProductsRepository'

interface Request {
  productId: string
}

interface Response {
  product: Product
}

export class GetOneProductByIdUseCase {
  constructor(private productsRepo: IProductsRepository) {}

  async execute({ productId }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new ProductNotFound()
    }

    return {
      product,
    }
  }
}

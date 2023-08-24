import { UpdateProductUseCase } from '@app/useCases/products/UpdateProductUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string().optional(),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  quantity: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  price: z.string().optional(),
  categories: z.string().array().optional(),
})

export class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const {
      name,
      excerpt,
      description,
      width,
      height,
      quantity,
      price,
      weight,
      categories,
    } = bodySchema.parse(req.body)

    const productsRepo = new PrismaProductsRepository()
    const categoriesRepo = new PrismaCategoriesRepository()
    const updateProductUseCase = new UpdateProductUseCase(
      productsRepo,
      categoriesRepo,
    )

    await updateProductUseCase.execute({
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
    })

    return res.status(204).send()
  }
}

import { AddCategoyToProductUseCase } from '@app/useCases/products/AddCategoyToProductUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().nonempty(),
})

const bodySchema = z.object({
  categoriesIds: z.string().array(),
})

export class AddCategoriesToProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const { categoriesIds } = bodySchema.parse(req.body)

    const productsRepo = new PrismaProductsRepository()
    const categoriesRepo = new PrismaCategoriesRepository()
    const addCategoyToProductUseCase = new AddCategoyToProductUseCase(
      productsRepo,
      categoriesRepo,
    )

    await addCategoyToProductUseCase.execute({
      productId,
      categoriesIds,
    })

    return res
      .status(201)
      .json({ message: 'category or categories added succesfuly!' })
  }
}

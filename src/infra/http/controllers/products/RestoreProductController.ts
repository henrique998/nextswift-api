import { RestoreProductUseCase } from '@app/useCases/products/RestoreProductUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class RestoreProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)

    const productsRepo = new PrismaProductsRepository()
    const restoreProductUseCase = new RestoreProductUseCase(productsRepo)

    await restoreProductUseCase.execute({ productId })

    return res.send()
  }
}

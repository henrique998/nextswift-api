import { RemoveProductUseCase } from '@app/useCases/products/RemoveProductUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { Request, Response } from 'express'

export class RemoveProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params
    const authorId = req.employee.id

    const prismaProductsRepository = new PrismaProductsRepository()
    const removeProductUseCase = new RemoveProductUseCase(
      prismaProductsRepository,
    )

    await removeProductUseCase.execute({ productId, authorId })

    return res.status(204).send()
  }
}

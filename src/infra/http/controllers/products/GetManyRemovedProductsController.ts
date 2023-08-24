import { GetManyRemovedProductsUseCase } from '@app/useCases/products/GetManyRemovedProductsUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})

export class GetManyRemovedProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = querySchema.parse(req.query)

    const productsRepo = new PrismaProductsRepository()
    const getManyRemovedProductsUseCase = new GetManyRemovedProductsUseCase(
      productsRepo,
    )

    const { products } = await getManyRemovedProductsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    })

    res.setHeader('x-total-count', String(products.length))

    return res.json(products.map(ProductViewModel.toHttp))
  }
}

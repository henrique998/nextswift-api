import { GetManyProductsUseCase } from '@app/useCases/products/GetManyProductsUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().optional(),
})

export class GetManyProductsController {
  async handle(req: Request, res: Response) {
    const { page = 0 } = querySchema.parse(req.query)

    const productsRepo = new PrismaProductsRepository()
    const getManyProductsUseCase = new GetManyProductsUseCase(productsRepo)

    const result = await getManyProductsUseCase.execute({ page })

    const products = result.products.map(ProductViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', String(result.totalCount))

    return res.json(products)
  }
}

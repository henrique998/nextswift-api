import { GetManyProductsBySearchWithDateUseCase } from '@app/useCases/products/GetManyProductsBySearchWithDateUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  search: z.string(),
})

export class GetManyProductsBySearchWithDateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, search } = querySchema.parse(req.query)

    const productsRepo = new PrismaProductsRepository()
    const getManyProductsBySearchUseCase =
      new GetManyProductsBySearchWithDateUseCase(productsRepo)

    const result = await getManyProductsBySearchUseCase.execute({
      startDate,
      endDate,
      search,
    })

    const products = result.products.map(ProductViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', String(products.length))

    return res.json(products)
  }
}

import { GetManyProductsBySearchUseCase } from '@app/useCases/products/GetManyProductsBySearchUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  search: z.string(),
})

export class GetManyProductsBySearchController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search } = querySchema.parse(req.query)

    const productsRepo = new PrismaProductsRepository()
    const getManyProductsBySearchUseCase = new GetManyProductsBySearchUseCase(
      productsRepo,
    )

    const result = await getManyProductsBySearchUseCase.execute({
      search,
    })

    const products = result.products.map(ProductViewModel.toHttp)

    res.setHeader('x-total-count', String(products.length))

    return res.json(products)
  }
}

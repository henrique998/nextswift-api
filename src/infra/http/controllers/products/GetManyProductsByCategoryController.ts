import { GetManyProductsByCategoryUseCase } from '@app/useCases/products/GetManyProductsByCategoryUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  categoryId: z.string().uuid(),
  page: z.coerce.number().optional(),
})

export class GetManyProductsByCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId, page = 0 } = querySchema.parse(req.query)

    const productsRepo = new PrismaProductsRepository()
    const categoriesRepo = new PrismaCategoriesRepository()
    const getManyProductsByCategoryUseCase =
      new GetManyProductsByCategoryUseCase(productsRepo, categoriesRepo)

    const result = await getManyProductsByCategoryUseCase.execute({
      categoryId,
      page,
    })
    const products = result.products.map(ProductViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', String(result.totalCount))

    return res.json(products)
  }
}

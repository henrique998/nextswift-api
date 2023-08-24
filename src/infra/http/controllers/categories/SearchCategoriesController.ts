import { Request, Response } from 'express'
import { z } from 'zod'

import { SearchCategoriesUseCase } from '@app/useCases/categories/SearchCategoriesUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { CategoryViewModel } from '@infra/http/viewModels/CategoryViewModel'

const querySchema = z.object({
  name: z.string().min(1, 'supply at least one letter!'),
})

export class SearchCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = querySchema.parse(req.query)

    const categoriesRepo = new PrismaCategoriesRepository()
    const searchCategoriesUseCase = new SearchCategoriesUseCase(categoriesRepo)

    const result = await searchCategoriesUseCase.execute({ name })

    const categories = result.categories.map(CategoryViewModel.toHttp)

    return res.json(categories)
  }
}

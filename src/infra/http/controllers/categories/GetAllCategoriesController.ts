import { Request, Response } from 'express'

import { GetAllCategoriesUseCase } from '@app/useCases/categories/GetAllCategoriesUseCase'

import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { CategoryViewModel } from '@infra/http/viewModels/CategoryViewModel'

export class GetAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const categoriesRepo = new PrismaCategoriesRepository()
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepo)

    const { categories } = await getAllCategoriesUseCase.execute()

    return res.json(categories.map(CategoryViewModel.toHttp))
  }
}

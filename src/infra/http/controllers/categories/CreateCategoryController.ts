import { Request, Response } from 'express'
import { z } from 'zod'

import { CreateCategoryUseCase } from '@app/useCases/categories/CreateCategoryUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'

const bodySchema = z.object({
  name: z.string().min(3, 'category name must have 3 or more characters!'),
})

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = bodySchema.parse(req.body)

    const categoriesRepo = new PrismaCategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepo)

    await createCategoryUseCase.execute({ name })

    return res.status(201).json({ message: 'Category created successfuly!' })
  }
}

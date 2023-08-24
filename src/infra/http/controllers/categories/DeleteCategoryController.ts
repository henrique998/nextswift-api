import { DeleteCategoryUseCase } from '@app/useCases/categories/DeleteCategoryUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  categoryId: z.string().nonempty(),
})

export class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = paramsSchema.parse(req.params)

    const categoriesRepo = new PrismaCategoriesRepository()
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepo)

    await deleteCategoryUseCase.execute({ categoryId })

    return res.status(204).send()
  }
}

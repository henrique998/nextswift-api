import { Category } from '@app/entities/Category'
import { AppError } from '@app/errors/AppError'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'

interface Request {
  name: string
}

type Response = void

export class CreateCategoryUseCase {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  async execute({ name }: Request): Promise<Response> {
    const categoryAlreadyExists = await this.categoriesRepo.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    const category = new Category({
      name,
      productsCount: 0,
    })

    await this.categoriesRepo.create(category)
  }
}

import { Category } from '@app/entities/Category'
import { AppError } from '@app/errors/AppError'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'

interface Request {
  name: string
}

interface Response {
  categories: Category[]
}

export class SearchCategoriesUseCase {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  async execute({ name }: Request): Promise<Response> {
    const categories = await this.categoriesRepo.search(name)

    if (!categories) {
      throw new AppError('categories not found!')
    }

    return {
      categories,
    }
  }
}

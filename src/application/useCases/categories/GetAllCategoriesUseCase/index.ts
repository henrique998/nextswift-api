import { Category } from '@app/entities/Category'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Response {
  categories: Category[]
}

export class GetAllCategoriesUseCase {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  async execute(): Promise<Response> {
    const cachedCategories = await redis.get('categories:all')

    if (cachedCategories) {
      const parsedCategoris = JSON.parse(cachedCategories)

      return {
        categories: parsedCategoris.map(Generate.category),
      }
    }

    const categories = await this.categoriesRepo.findAll()

    await redis.set(
      'categories:all',
      JSON.stringify(categories.map(Generate.redisCategory)),
      'EX',
      '20',
    )

    return {
      categories,
    }
  }
}

import { Category } from '@app/entities/Category'
import { Category as RawCategory } from '@prisma/client'

export class PrismaCategoriesMapper {
  static toPrisma(category: Category): RawCategory {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
    }
  }

  static toDomain(raw: RawCategory, productsCount: number): Category {
    return new Category(
      {
        name: raw.name,
        productsCount,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}

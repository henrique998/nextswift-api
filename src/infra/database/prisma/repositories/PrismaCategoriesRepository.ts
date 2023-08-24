import { Category } from '@app/entities/Category'
import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { prisma } from '..'
import { PrismaCategoriesMapper } from '../mappers/PrismaCategoriesMapper'

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async findById(categoryId: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoriesMapper.toDomain(category, category._count.products)
  }

  async findManyByIds(categoriesIds: string[]): Promise<Category[] | null> {
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoriesIds,
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (!categories) {
      return null
    }

    return categories.map((category) =>
      PrismaCategoriesMapper.toDomain(category, category._count.products),
    )
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    return categories.map((category) =>
      PrismaCategoriesMapper.toDomain(category, category._count.products),
    )
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoriesMapper.toDomain(category, category._count.products)
  }

  async search(search: string): Promise<Category[] | null> {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })

    if (!categories) {
      return null
    }

    return categories.map((category) =>
      PrismaCategoriesMapper.toDomain(category, category._count.products),
    )
  }

  async create(category: Category): Promise<void> {
    const raw = PrismaCategoriesMapper.toPrisma(category)

    await prisma.category.create({
      data: raw,
    })
  }

  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })
  }

  async count(): Promise<number> {
    const count = await prisma.category.count()

    return count
  }
}

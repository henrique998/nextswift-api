import { Product } from '@app/entities/Product'
import {
  IProductsRepository,
  PaginateProductParams,
  PaginateRemovedProductsParams,
  PaginatedProductsResponse,
  SearchProductParams,
} from '@app/repositories/IProductsRepository'
import { prisma } from '..'
import { PrismaProductMapper } from '../mappers/PrismaProductMapper'

export class PrismaProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      where: {
        removedAt: null,
      },
    })

    const result = products.map((product) => {
      return PrismaProductMapper.toDomain({
        product,
        images: product.images,
        categories: product.categories.map((productCategory) => {
          return {
            id: productCategory.category?.id ?? '',
            name: productCategory.category?.name ?? '',
            createdAt: productCategory.category?.createdAt ?? new Date(),
          }
        }),
      })
    })

    return result
  }

  async findByName(productName: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        name: productName,
        removedAt: null,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!product) {
      return null
    }

    const result = PrismaProductMapper.toDomain({
      product,
      images: product.images,
      categories: product.categories.map((productCategory) => {
        return {
          id: productCategory.category?.id ?? '',
          name: productCategory.category?.name ?? '',
          createdAt: productCategory.category?.createdAt ?? new Date(),
        }
      }),
    })

    return result
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        removedAt: null,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!product) {
      return null
    }

    const result = PrismaProductMapper.toDomain({
      product,
      images: product.images,
      categories: product.categories.map((productCategory) => {
        return {
          id: productCategory.category?.id ?? '',
          name: productCategory.category?.name ?? '',
          createdAt: productCategory.category?.createdAt ?? new Date(),
        }
      }),
    })

    return result
  }

  async findRemovedById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        removedAt: {
          not: null,
        },
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!product) {
      return null
    }

    const result = PrismaProductMapper.toDomain({
      product,
      images: product.images,
      categories: product.categories.map((productCategory) => {
        return {
          id: productCategory.category?.id ?? '',
          name: productCategory.category?.name ?? '',
          createdAt: productCategory.category?.createdAt ?? new Date(),
        }
      }),
    })

    return result
  }

  async findManyByIds(productsIds: string[]): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (products.length === 0) {
      return null
    }

    const result = products.map((product) =>
      PrismaProductMapper.toDomain({
        product,
        images: product.images,
        categories: product.categories.map((productCategory) => {
          return {
            id: productCategory.category?.id ?? '',
            name: productCategory.category?.name ?? '',
            createdAt: productCategory.category?.createdAt ?? new Date(),
          }
        }),
      }),
    )

    return result
  }

  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product)

    if (product.categories) {
      const categories = product.categories?.map((category) => {
        return {
          id: category.id,
        }
      })

      await prisma.product.create({
        data: {
          ...raw,
          categories: {
            create: categories.map((category) => ({
              category: { connect: { id: category.id } },
            })),
          },
        },
      })
    } else {
      await prisma.product.create({
        data: {
          ...raw,
        },
      })
    }

    if (product.images) {
      const images = product.images.map((image) => {
        return {
          id: image.id,
          url: image.url,
          name: image.name,
          size: image.size,
          createdAt: image.createdAt,
          productId: product.id,
        }
      })

      await prisma.productImage.createMany({
        data: images,
      })
    }
  }

  async save(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product)

    await prisma.$transaction(async (orm) => {
      await orm.product.update({
        data: {
          ...raw,
        },
        where: {
          id: raw.id,
        },
      })

      if (product.categories) {
        const productCategories = await orm.productCategory.findMany({
          where: {
            productId: raw.id,
          },
        })

        await prisma.productCategory.deleteMany({
          where: {
            id: { in: productCategories.map((category) => category.id) },
          },
        })

        const newCategories = product.categories.map((category) => {
          return {
            categoryId: category.id,
            productId: raw.id,
          }
        })

        await orm.productCategory.createMany({
          data: newCategories,
        })
      }
    })
  }

  async paginate({
    categoryId,
    limit = 10,
    page,
  }: PaginateProductParams): Promise<PaginatedProductsResponse | null> {
    let products = []
    let totalCount = 0

    if (categoryId) {
      products = await prisma.product.findMany({
        where: {
          categories: {
            some: {
              categoryId,
            },
          },
          removedAt: null,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          images: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      })

      totalCount = await prisma.product.count({
        where: {
          categories: {
            some: {
              categoryId,
            },
          },
          removedAt: null,
        },
      })
    } else {
      products = await prisma.product.findMany({
        where: {
          removedAt: null,
        },
        take: limit,
        skip: (page - 1) * limit,
        include: {
          images: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      })

      totalCount = await prisma.product.count({
        where: {
          removedAt: null,
        },
      })
    }

    if (!products) {
      return null
    }

    return {
      products: products.map((product) =>
        PrismaProductMapper.toDomain({
          product,
          images: product.images,
          categories: product.categories.map((productCategory) => {
            return {
              id: productCategory.category?.id ?? '',
              name: productCategory.category?.name ?? '',
              createdAt: productCategory.category?.createdAt ?? new Date(),
            }
          }),
        }),
      ),
      totalCount,
    }
  }

  async paginateRemoved({
    page,
    limit = 10,
  }: PaginateRemovedProductsParams): Promise<Product[] | null> {
    const result = await prisma.product.findMany({
      where: {
        removedAt: {
          not: null,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    return result.map((product) =>
      PrismaProductMapper.toDomain({
        product,
        images: product.images,
        categories: product.categories.map((productCategory) => {
          return {
            id: productCategory.category?.id ?? '',
            name: productCategory.category?.name ?? '',
            createdAt: productCategory.category?.createdAt ?? new Date(),
          }
        }),
      }),
    )
  }

  async searchWithDate({
    startDate,
    endDate,
    search,
  }: SearchProductParams): Promise<Product[] | null> {
    const result = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          },
          {
            createdAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        ],
        removedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!result) {
      return null
    }

    return result.map((product) =>
      PrismaProductMapper.toDomain({
        product,
        images: product.images,
        categories: product.categories.map((productCategory) => {
          return {
            id: productCategory.category?.id ?? '',
            name: productCategory.category?.name ?? '',
            createdAt: productCategory.category?.createdAt ?? new Date(),
          }
        }),
      }),
    )
  }

  async search(search: string): Promise<Product[] | null> {
    const result = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
        removedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!result) {
      return null
    }

    return result.map((product) =>
      PrismaProductMapper.toDomain({
        product,
        images: product.images,
        categories: product.categories.map((productCategory) => {
          return {
            id: productCategory.category?.id ?? '',
            name: productCategory.category?.name ?? '',
            createdAt: productCategory.category?.createdAt ?? new Date(),
          }
        }),
      }),
    )
  }

  async count(): Promise<number> {
    const count = await prisma.product.count()

    return count
  }
}

import { Purchase } from '@app/entities/Purchase'
import {
  IPurchasesRepository,
  PaginateParams,
  PaginatedPurchasesResponse,
} from '@app/repositories/IPurchasesRepository'
import dayjs from 'dayjs'
import { prisma } from '..'
import { PrismaPurchaseMapper } from '../mappers/PrismaPurchaseMapper'

export class PrismaPurchasesRepository implements IPurchasesRepository {
  async paginate({
    startDate,
    endDate,
    limit = 10,
    page,
  }: PaginateParams): Promise<PaginatedPurchasesResponse | null> {
    const result = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        buyer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    })

    const totalPurchases = await prisma.purchase.count()

    if (!result) {
      return null
    }

    return {
      purchases: result.map((purchase) => {
        return PrismaPurchaseMapper.toDomain(purchase, {
          buyerName: purchase.buyer?.name,
          productName: purchase.product?.name,
        })
      }),
      totalCount: totalPurchases,
    }
  }

  async create(purchase: Purchase): Promise<void> {
    const raw = PrismaPurchaseMapper.toPrisma(purchase)

    await prisma.purchase.create({
      data: raw,
    })
  }

  async search(searchDate: Date): Promise<Purchase[] | null> {
    const parsedDate = dayjs(searchDate)
    const startOfDay = parsedDate.startOf('day').toDate()
    const endOfDay = parsedDate.endOf('day').toDate()

    const result = await prisma.purchase.findMany({
      where: {
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        buyer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!result) {
      return null
    }

    return result.map((purchase) => {
      return PrismaPurchaseMapper.toDomain(purchase, {
        buyerName: purchase.buyer?.name,
        productName: purchase.product?.name,
      })
    })
  }

  async count(): Promise<number> {
    const count = await prisma.purchase.count()

    return count
  }
}

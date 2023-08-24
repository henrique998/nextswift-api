import { GetPurchasesMetricsUseCase } from '@app/useCases/metrics/GetPurchasesMetricsUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  searchDate: z.coerce.date(),
})

export class GetPurchasesMetricsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { searchDate } = querySchema.parse(req.query)

    const purchasesRepo = new PrismaPurchasesRepository()
    const productsRepo = new PrismaProductsRepository()

    const getPurchasesMetricsUseCase = new GetPurchasesMetricsUseCase(
      purchasesRepo,
      productsRepo,
    )

    const { purchases } = await getPurchasesMetricsUseCase.execute({
      searchDate,
    })

    const dates = purchases.map((purchase) => purchase.createdAt)
    const products = purchases.map((purchase) => purchase.productName)
    const quantities = purchases.map((purchase) => purchase.productsQty)

    return res.json({
      dates,
      products,
      quantities,
    })
  }
}

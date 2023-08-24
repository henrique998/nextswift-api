import { GetManyPurchasesUseCase } from '@app/useCases/purchases/GetManyPurchasesUseCase'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { PurchaseViewModel } from '@infra/http/viewModels/PurchaseViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GetManyPurchasesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, page, limit } = querySchema.parse(req.query)

    const purchasesRepo = new PrismaPurchasesRepository()
    const getManyPurchasesUseCase = new GetManyPurchasesUseCase(purchasesRepo)

    const result = await getManyPurchasesUseCase.execute({
      startDate,
      endDate,
      page,
      limit,
    })

    const purchases = result.purchases.map(PurchaseViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', result.totalCount)

    return res.json(purchases)
  }
}

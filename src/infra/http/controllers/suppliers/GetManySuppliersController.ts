import { GetManySuppliersUseCase } from '@app/useCases/suppliers/GetManySuppliers'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { SupplierViewModel } from '@infra/http/viewModels/SupplierViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})

export class GetManySuppliersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = querySchema.parse(req.query)

    const suppliersRepo = new PrismaSuppliersRepository()
    const getManySuppliersUseCase = new GetManySuppliersUseCase(suppliersRepo)

    const result = await getManySuppliersUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    })

    const suppliers = result.suppliers.map(SupplierViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', result.totalCount)

    return res.json(suppliers)
  }
}

import { GetSupplierByIdUseCase } from '@app/useCases/suppliers/GetSupplierByIdUseCase'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { SupplierViewModel } from '@infra/http/viewModels/SupplierViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  supplierId: z.string().uuid(),
})

export class GetSupplierByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { supplierId } = paramsSchema.parse(req.params)

    const suppliersRepo = new PrismaSuppliersRepository()
    const getSupplierByIdUseCase = new GetSupplierByIdUseCase(suppliersRepo)

    const { supplier } = await getSupplierByIdUseCase.execute({ supplierId })

    return res.json(SupplierViewModel.toHttp(supplier))
  }
}

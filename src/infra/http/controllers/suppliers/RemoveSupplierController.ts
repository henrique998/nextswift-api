import { RemoveSupplierUseCase } from '@app/useCases/suppliers/RemoveSupplierUseCase'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  supplierId: z.string().min(10, 'Invalid supplier id lenght!'),
})

export class RemoveSupplierController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { supplierId } = bodySchema.parse(req.body)

    const SuppliersRepo = new PrismaSuppliersRepository()
    const removeSupplierUseCase = new RemoveSupplierUseCase(SuppliersRepo)

    await removeSupplierUseCase.execute({
      supplierId,
    })

    return res.status(204).json({ message: 'Supplier removed successfuly!' })
  }
}

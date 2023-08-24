import { UpdateSupplierInfoUseCase } from '@app/useCases/suppliers/UpdateSupplierInfoUseCase'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  supplierId: z.string().nonempty('Supplier id must be provided!'),
})

const bodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.number().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.number().optional(),
  complement: z.string().optional(),
  uf: z.string().optional(),
})

export class UpdateSupplierInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { supplierId } = paramsSchema.parse(req.params)

    const { name, email, phone, cep, street, number, complement, uf } =
      bodySchema.parse(req.body)

    const suppliersRepo = new PrismaSuppliersRepository()
    const updateSupplierInfoUseCase = new UpdateSupplierInfoUseCase(
      suppliersRepo,
    )

    await updateSupplierInfoUseCase.execute({
      supplierId,
      name,
      email,
      phone,
      cep,
      street,
      number,
      complement,
      uf,
    })

    return res
      .status(204)
      .json({ message: 'Supplier info updated successfuly!' })
  }
}

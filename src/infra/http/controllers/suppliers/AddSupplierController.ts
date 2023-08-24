import { AddSupplierUseCase } from '@app/useCases/suppliers/AddSuppliersUseCase'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(3, 'name must have 3 characters or more!'),
  email: z.string().email('Invalid email!'),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  ddd: z.coerce.number().min(2, 'ddd must have 2 digits!'),
  phone: z.coerce.number().min(9, 'phone must have 9 digits!'),
  cep: z.string().min(8, 'cep must have 8 digits!'),
  street: z.string().min(3, 'street must have 3 characters or more!'),
  number: z.coerce.number().min(2, 'number must have 2 digits or more!'),
  complement: z.string().optional(),
  uf: z.string().min(2, 'uf must have 2 characters!'),
})

export class AddSupplierController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      cnpj,
      ddd,
      phone,
      cep,
      street,
      number,
      complement,
      uf,
    } = bodySchema.parse(req.body)

    const suppliersRepo = new PrismaSuppliersRepository()
    const addSupplierUseCase = new AddSupplierUseCase(suppliersRepo)

    await addSupplierUseCase.execute({
      name,
      email,
      cpf,
      cnpj,
      ddd,
      phone,
      cep,
      street,
      number,
      complement,
      uf,
    })

    return res.status(201).json({ message: 'Supplier added succesfuly!' })
  }
}

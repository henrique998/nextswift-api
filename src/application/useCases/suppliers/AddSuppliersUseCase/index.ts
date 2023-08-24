import { Supplier } from '@app/entities/Supplier'
import { Address } from '@app/entities/Supplier/Address'
import { Cep } from '@app/entities/Supplier/Cep'
import { AppError } from '@app/errors/AppError'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'

interface Request {
  name: string
  email: string
  cpf?: string | null
  cnpj?: string | null
  ddd: number
  phone: number
  cep: string
  street: string
  number: number
  complement?: string | null
  uf: string
}

type Response = void

export class AddSupplierUseCase {
  constructor(private SuppliersRepo: ISuppliersRepository) {}

  async execute(data: Request): Promise<Response> {
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
    } = data

    const supplierAlreadyExists = await this.SuppliersRepo.findByEmail(email)

    if (supplierAlreadyExists) {
      throw new AppError('Supplier Already Exists!')
    }

    const supplier = new Supplier({
      name,
      email,
      cpf: cpf ?? null,
      cnpj: cnpj ?? null,
      ddd,
      phone,
      address: new Address({
        cep: new Cep(cep),
        street,
        number,
        complement,
        uf,
      }),
    })

    await this.SuppliersRepo.create(supplier)
  }
}

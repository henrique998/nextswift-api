import { Address } from '@app/entities/Supplier/Address'
import { Cep } from '@app/entities/Supplier/Cep'
import { SupplierNotFoundError } from '@app/errors/SupplierNotFound'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'

interface Request {
  supplierId: string
  name?: string
  email?: string
  phone?: number
  cep?: string
  street?: string
  number?: number
  complement?: string
  uf?: string
}

type Response = void

export class UpdateSupplierInfoUseCase {
  constructor(private suppliersRepo: ISuppliersRepository) {}

  async execute({ supplierId, ...data }: Request): Promise<Response> {
    const supplier = await this.suppliersRepo.findById(supplierId)

    if (!supplier) {
      throw new SupplierNotFoundError()
    }

    supplier.name = data.name ?? supplier.name
    supplier.email = data.email ?? supplier.email
    supplier.phone = data.phone ?? supplier.phone
    supplier.address = new Address({
      cep: new Cep(data.cep ?? supplier.address.cep.value),
      street: data.street ?? supplier.address.street,
      number: data.number ?? supplier.address.number,
      uf: data.uf ?? supplier.address.uf,
    })
    supplier.update()

    await this.suppliersRepo.save(supplier)
  }
}

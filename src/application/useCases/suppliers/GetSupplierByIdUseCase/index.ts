import { Supplier } from '@app/entities/Supplier'
import { SupplierNotFoundError } from '@app/errors/SupplierNotFound'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'

interface Request {
  supplierId: string
}

interface Response {
  supplier: Supplier
}

export class GetSupplierByIdUseCase {
  constructor(private suppliersRepo: ISuppliersRepository) {}

  async execute({ supplierId }: Request): Promise<Response> {
    const supplier = await this.suppliersRepo.findById(supplierId)

    if (!supplier) {
      throw new SupplierNotFoundError()
    }

    return {
      supplier,
    }
  }
}

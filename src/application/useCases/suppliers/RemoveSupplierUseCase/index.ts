import { AppError } from '@app/errors/AppError'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'

interface Request {
  supplierId: string
}

type Response = void

export class RemoveSupplierUseCase {
  constructor(private suppliersRepo: ISuppliersRepository) {}

  async execute({ supplierId }: Request): Promise<Response> {
    const supplier = await this.suppliersRepo.findById(supplierId)

    if (!supplier) {
      throw new AppError('Supplier not found!')
    }

    supplier.remove()

    await this.suppliersRepo.save(supplier)
  }
}

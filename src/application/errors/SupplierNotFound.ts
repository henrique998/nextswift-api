import { AppError } from './AppError'

export class SupplierNotFoundError extends AppError {
  constructor() {
    super('Supplier not found!', 404)
  }
}

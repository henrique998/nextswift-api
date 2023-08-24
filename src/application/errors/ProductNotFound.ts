import { AppError } from './AppError'

export class ProductNotFound extends AppError {
  constructor() {
    super('product not found!', 404)
  }
}

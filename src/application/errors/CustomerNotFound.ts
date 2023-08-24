import { AppError } from './AppError'

export class CustomerNotFoundError extends AppError {
  constructor() {
    super('Customer not found!', 404)
  }
}

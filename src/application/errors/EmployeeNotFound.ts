import { AppError } from './AppError'

export class EmployeeNotFoundError extends AppError {
  constructor() {
    super('Employee not found!', 404)
  }
}

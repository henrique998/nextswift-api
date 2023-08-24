import { AppError } from './AppError'

export class CategoryNotFound extends AppError {
  constructor() {
    super('Category not found!', 404)
  }
}

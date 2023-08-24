import { Category } from '@app/entities/Category'

export interface ICategoriesRepository {
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | null>
  findById(categoryId: string): Promise<Category | null>
  findManyByIds(categoriesIds: string[]): Promise<Category[] | null>
  search(search: string): Promise<Category[] | null>
  create(category: Category): Promise<void>
  delete(categoryId: string): Promise<void>
  count(): Promise<number>
}

import { Product } from '@app/entities/Product'

export type PaginateProductParams = {
  categoryId?: string
  page: number
  limit?: number
}

export type PaginatedProductsResponse = {
  products: Product[]
  totalCount: number
}

export type PaginateRemovedProductsParams = {
  page: number
  limit?: number
}

export type SearchProductParams = {
  startDate: string
  endDate: string
  search: string
}

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findByName(productName: string): Promise<Product | null>
  findById(productId: string): Promise<Product | null>
  findRemovedById(productId: string): Promise<Product | null>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
  paginate(
    params: PaginateProductParams,
  ): Promise<PaginatedProductsResponse | null>
  paginateRemoved(
    params: PaginateRemovedProductsParams,
  ): Promise<Product[] | null>
  searchWithDate(params: SearchProductParams): Promise<Product[] | null>
  search(search: string): Promise<Product[] | null>
  count(): Promise<number>
}

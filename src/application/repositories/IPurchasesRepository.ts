import { Purchase } from '@app/entities/Purchase'

export interface PaginateParams {
  startDate: string
  endDate: string
  page: number
  limit: number
}

export interface PaginatedPurchasesResponse {
  purchases: Purchase[]
  totalCount: number
}

export interface IPurchasesRepository {
  paginate(params: PaginateParams): Promise<PaginatedPurchasesResponse | null>
  create(purchase: Purchase): Promise<void>
  search(searchDate: Date): Promise<Purchase[] | null>
  count(): Promise<number>
}

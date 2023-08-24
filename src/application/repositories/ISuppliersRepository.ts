import { Supplier } from '@app/entities/Supplier'

export type SupplierPaginateParams = {
  page: number
  limit: number
}

export interface PaginatedSuppliersResponse {
  suppliers: Supplier[]
  totalCount: number
}

export interface ISuppliersRepository {
  findById(supplierId: string): Promise<Supplier | null>
  findByEmail(email: string): Promise<Supplier | null>
  paginate(
    params: SupplierPaginateParams,
  ): Promise<PaginatedSuppliersResponse | null>
  create(supplier: Supplier): Promise<void>
  save(supplier: Supplier): Promise<void>
  count(): Promise<number>
}

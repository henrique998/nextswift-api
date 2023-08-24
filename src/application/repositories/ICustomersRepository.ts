import { Customer } from '@app/entities/Customer'

export type PaginateParams = {
  page: number
  limit: number
}

export interface PaginatedCustomersResponse {
  customers: Customer[]
  totalCount: number
}

export interface ICustomersRepository {
  findAll(): Promise<Customer[]>
  findById(customerId: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  paginate(params: PaginateParams): Promise<PaginatedCustomersResponse | null>
  create(customer: Customer): Promise<void>
  save(customer: Customer): Promise<void>
  count(): Promise<number>
}

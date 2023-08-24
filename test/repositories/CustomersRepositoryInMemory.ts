import { Customer } from '@app/entities/Customer'
import {
  ICustomersRepository,
  PaginateParams,
  PaginatedCustomersResponse,
} from '@app/repositories/ICustomersRepository'

export class CustomersRepositoryInMemory implements ICustomersRepository {
  customers: Customer[] = []

  async findAll(): Promise<Customer[]> {
    return this.customers
  }

  async findById(customerId: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.id === customerId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.email === email)

    if (!customer) {
      return null
    }

    return customer
  }

  async paginate({
    page,
    limit = 10,
  }: PaginateParams): Promise<PaginatedCustomersResponse | null> {
    const filteredCustomers = this.customers.filter(
      (customer) => customer.deletedAt === null,
    )

    const totalCount = filteredCustomers.length
    const paginatedCustomers = this.paginateArr(filteredCustomers, page, limit)

    if (paginatedCustomers.length === 0) {
      return null
    }

    return {
      customers: paginatedCustomers,
      totalCount,
    }
  }

  private paginateArr(customersArr: Customer[], page: number, limit: number) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedItems = customersArr.slice(startIndex, endIndex)

    return paginatedItems
  }

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (customerData) => customerData.id === customer.id,
    )

    if (customerIndex !== -1) {
      this.customers[customerIndex] = customer
    }
  }

  async count(): Promise<number> {
    return this.customers.length
  }
}

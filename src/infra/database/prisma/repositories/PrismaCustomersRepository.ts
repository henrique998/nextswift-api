import { Customer } from '@app/entities/Customer'
import {
  ICustomersRepository,
  PaginateParams,
  PaginatedCustomersResponse,
} from '@app/repositories/ICustomersRepository'
import { prisma } from '..'
import { PrismaCustomersMapper } from '../mappers/PrismaCustomersMapper'

export class PrismaCustomersRepository implements ICustomersRepository {
  async findAll(): Promise<Customer[]> {
    const customers = await prisma.customer.findMany({
      where: {
        deletedAt: null,
      },
    })

    return customers.map(PrismaCustomersMapper.toDomain)
  }

  async findById(customerId: string): Promise<Customer | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        deletedAt: null,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomersMapper.toDomain(customer)
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomersMapper.toDomain(customer)
  }

  async paginate({
    page,
    limit = 10,
  }: PaginateParams): Promise<PaginatedCustomersResponse | null> {
    const customers = await prisma.customer.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        deletedAt: null,
      },
    })

    const totalCount = await prisma.customer.count({
      where: {
        deletedAt: null,
      },
    })

    if (!customers) {
      return null
    }

    return {
      customers: customers.map(PrismaCustomersMapper.toDomain),
      totalCount,
    }
  }

  async create(customer: Customer): Promise<void> {
    const raw = PrismaCustomersMapper.toPrisma(customer)

    await prisma.customer.create({
      data: raw,
    })
  }

  async save(customer: Customer): Promise<void> {
    const raw = PrismaCustomersMapper.toPrisma(customer)

    await prisma.customer.update({
      data: raw,
      where: {
        id: customer.id,
      },
    })
  }

  async count(): Promise<number> {
    const count = await prisma.customer.count()

    return count
  }
}

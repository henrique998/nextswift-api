import { Supplier } from '@app/entities/Supplier'
import {
  ISuppliersRepository,
  PaginatedSuppliersResponse,
  SupplierPaginateParams,
} from '@app/repositories/ISuppliersRepository'
import { prisma } from '..'
import { PrismaSuppliersMapper } from '../mappers/PrismaSuppliersMapper'

export class PrismaSuppliersRepository implements ISuppliersRepository {
  async findById(SupplierId: string): Promise<Supplier | null> {
    const Supplier = await prisma.supplier.findUnique({
      where: {
        id: SupplierId,
      },
    })

    if (!Supplier) {
      return null
    }

    return PrismaSuppliersMapper.toDomain(Supplier)
  }

  async findByEmail(email: string): Promise<Supplier | null> {
    const Supplier = await prisma.supplier.findUnique({
      where: {
        email,
      },
    })

    if (!Supplier) {
      return null
    }

    return PrismaSuppliersMapper.toDomain(Supplier)
  }

  async paginate({
    page,
    limit = 10,
  }: SupplierPaginateParams): Promise<PaginatedSuppliersResponse | null> {
    const suppliers = await prisma.supplier.findMany({
      where: {
        deletedAt: null,
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    const totalCount = await prisma.supplier.count({
      where: {
        deletedAt: null,
      },
    })

    if (!suppliers) {
      return null
    }

    return {
      suppliers: suppliers.map(PrismaSuppliersMapper.toDomain),
      totalCount,
    }
  }

  async create(Supplier: Supplier): Promise<void> {
    const raw = PrismaSuppliersMapper.toPrisma(Supplier)

    await prisma.supplier.create({
      data: {
        ...raw,
      },
    })
  }

  async save(Supplier: Supplier): Promise<void> {
    const raw = PrismaSuppliersMapper.toPrisma(Supplier)

    await prisma.supplier.update({
      data: raw,
      where: {
        id: Supplier.id,
      },
    })
  }

  async count(): Promise<number> {
    const count = await prisma.supplier.count()

    return count
  }
}

import { Employee } from '@app/entities/Employee'
import {
  EmployeePaginateParams,
  IEmployeesRepository,
} from '@app/repositories/IEmployeesRepository'
import { prisma } from '..'
import { PrismaEmployeesMapper } from '../mappers/PrismaEmployeesMapper'

export class PrismaEmployeesRepository implements IEmployeesRepository {
  async findById(id: string): Promise<Employee | null> {
    const result = await prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    })

    if (!result) {
      return null
    }

    return PrismaEmployeesMapper.toDomain(result, result.role?.name ?? '')
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const result = await prisma.employee.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    })

    if (!result) {
      return null
    }

    return PrismaEmployeesMapper.toDomain(result, result.role?.name ?? '')
  }

  async create(employee: Employee, roleId: string): Promise<void> {
    const raw = PrismaEmployeesMapper.toPrisma(employee, roleId)

    await prisma.employee.create({
      data: {
        ...raw,
      },
    })
  }

  async paginate({
    page,
    limit,
  }: EmployeePaginateParams): Promise<Employee[] | null> {
    const result = await prisma.employee.findMany({
      skip: page,
      take: limit,
      include: {
        role: true,
      },
      where: {
        dismissedAt: null,
      },
    })

    if (!result) {
      return null
    }

    return result.map((employee) =>
      PrismaEmployeesMapper.toDomain(employee, employee.role?.name),
    )
  }

  async save(employee: Employee, roleId?: string): Promise<void> {
    const raw = PrismaEmployeesMapper.toPrisma(employee, roleId)

    await prisma.employee.update({
      data: {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        avatar: raw.avatar,
        phone: raw.phone,
        dismissedAt: employee.dismissedAt,
        updatedAt: employee.updatedAt,
      },
      where: {
        id: raw.id,
      },
    })
  }

  async delete(employeeId: string): Promise<void> {
    await prisma.employee.delete({
      where: {
        id: employeeId,
      },
    })
  }

  async count(): Promise<number> {
    const count = await prisma.employee.count()

    return count
  }
}

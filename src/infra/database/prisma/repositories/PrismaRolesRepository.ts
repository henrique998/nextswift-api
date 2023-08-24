import { Role } from '@app/entities/Role'
import { IRolesRepository } from '@app/repositories/IRolesRepository'
import { prisma } from '..'
import { PrismaRolesMapper } from '../mappers/PrismaRolesMapper'

export class PrismaRolesRepository implements IRolesRepository {
  async findAll(): Promise<Role[] | null> {
    const result = await prisma.role.findMany()

    if (!result) {
      return null
    }

    return result.map(PrismaRolesMapper.toDomain)
  }

  async findByName(name: string): Promise<Role | null> {
    const result = await prisma.role.findFirst({
      where: {
        name,
      },
    })

    if (!result) {
      return null
    }

    return PrismaRolesMapper.toDomain(result)
  }

  async findByEmployeeId(employeeId: string): Promise<Role[] | null> {
    const result = await prisma.role.findMany({
      where: {
        employeeId,
      },
    })

    if (!result) {
      return null
    }

    return result.map(PrismaRolesMapper.toDomain)
  }

  async create(role: Role): Promise<void> {
    const raw = PrismaRolesMapper.toPrisma(role)

    await prisma.role.create({
      data: raw,
    })
  }
}

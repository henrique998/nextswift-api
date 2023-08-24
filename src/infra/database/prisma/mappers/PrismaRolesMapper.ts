import { Role } from '@app/entities/Role'
import { Name } from '@app/entities/Role/Name'
import { Role as RawRole } from '@prisma/client'

export class PrismaRolesMapper {
  static toPrisma(role: Role): RawRole {
    return {
      id: role.id,
      name: role.name.value,
      employeeId: role.employeeId,
      createdAt: role.createdAt,
    }
  }

  static toDomain(role: RawRole): Role {
    return new Role(
      {
        name: new Name(role.name),
        employeeId: role.employeeId,
        createdAt: role.createdAt,
      },
      role.id,
    )
  }
}

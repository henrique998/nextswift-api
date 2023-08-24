import { Role } from '@app/entities/Role'
import { IRolesRepository } from '@app/repositories/IRolesRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

type Response = {
  roles: Role[]
}

export class GetAllRolesUseCase {
  constructor(private rolesRepo: IRolesRepository) {}

  async execute(): Promise<Response> {
    const cachedRoles = await redis.get('roles:many')

    if (cachedRoles) {
      const parsedProducts = JSON.parse(cachedRoles)
      return {
        roles: parsedProducts.map(Generate.role),
      }
    }

    const roles = await this.rolesRepo.findAll()

    await redis.set(
      'products:many:category',
      JSON.stringify(roles?.map(Generate.redisRole)),
      'EX',
      '20',
    )

    if (!roles) {
      return {
        roles: [],
      }
    }

    return {
      roles,
    }
  }
}

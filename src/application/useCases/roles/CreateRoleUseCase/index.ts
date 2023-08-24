/* eslint-disable no-useless-constructor */
import { Role } from '@app/entities/Role'
import { Name } from '@app/entities/Role/Name'
import { AppError } from '@app/errors/AppError'
import { IRolesRepository } from '@app/repositories/IRolesRepository'

type Response = void

export class CreateRoleUseCase {
  constructor(private rolesRepo: IRolesRepository) {}

  async execute(name: string): Promise<Response> {
    if (!name) {
      throw new AppError('name is required!')
    }

    const roleAlreadyExists = await this.rolesRepo.findByName(name)

    if (roleAlreadyExists) {
      throw new AppError('Role already exists!')
    }

    const role = new Role({
      name: new Name(name),
    })

    await this.rolesRepo.create(role)
  }
}

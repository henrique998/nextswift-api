import { GetAllRolesUseCase } from '@app/useCases/roles/GetAllRolesUseCase'
import { PrismaRolesRepository } from '@infra/database/prisma/repositories/PrismaRolesRepository'
import { RoleViewModel } from '@infra/http/viewModels/RoleViewModel'
import { Request, Response } from 'express'

export class GetAllRolesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const rolesRepo = new PrismaRolesRepository()
    const getAllRolesUseCase = new GetAllRolesUseCase(rolesRepo)

    const result = await getAllRolesUseCase.execute()

    const roles = result.roles.map(RoleViewModel.toHttp)

    return res.json(roles)
  }
}

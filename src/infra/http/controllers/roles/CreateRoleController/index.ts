import { CreateRoleUseCase } from '@app/useCases/roles/CreateRoleUseCase'
import { PrismaRolesRepository } from '@infra/database/prisma/repositories/PrismaRolesRepository'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
})

export class CreateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = bodySchema.parse(req.body)

    const rolesRepository = new PrismaRolesRepository()
    const createRoleUseCase = new CreateRoleUseCase(rolesRepository)

    await createRoleUseCase.execute(name)

    return res.status(201).send('role created successfuly!')
  }
}

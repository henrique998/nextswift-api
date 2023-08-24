import { NextFunction, Request, Response } from 'express'
import { AppError } from 'src/application/errors/AppError'
import { prisma } from 'src/infra/database/prisma'

export function is(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.employee

    const employee = await prisma.employee.findFirst({
      where: {
        id,
      },
      include: {
        role: true,
      },
    })

    const hasRoleValid = roles.includes(employee?.role?.name!!)

    if (!hasRoleValid) {
      throw new AppError('Unauthorized action!', 401)
    }

    next()
  }
}

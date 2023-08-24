import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from 'src/application/errors/AppError'
import { env } from 'src/infra/env'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError({ error: true, code: 'token.missing' }, 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, env.JWT_SECRET_KEY) as IPayload

    req.employee = {
      id: sub,
    }

    next()
  } catch {
    throw new AppError({ error: true, code: 'token.expired' }, 401)
  }
}

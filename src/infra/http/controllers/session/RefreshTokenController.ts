import { RefreshTokenUseCase } from '@app/useCases/session/RefreshTokenUseCase'
import { PrismaTokensRepository } from '@infra/database/prisma/repositories/PrismaTokensRepository'
import { DayjsDateProvider } from '@infra/providers/date/DayjsDateProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  refreshToken: z.string().min(1, 'refresh token must be provided!'),
})

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = bodySchema.parse(req.body)

    const tokensRepo = new PrismaTokensRepository()
    const dateProvider = new DayjsDateProvider()
    const refreshTokenUseCase = new RefreshTokenUseCase(
      tokensRepo,
      dateProvider,
    )

    const result = await refreshTokenUseCase.execute(refreshToken)

    return res.json(result)
  }
}

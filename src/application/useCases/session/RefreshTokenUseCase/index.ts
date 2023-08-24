/* eslint-disable no-useless-constructor */

import { Token } from '@app/entities/Token'
import { AppError } from '@app/errors/AppError'
import { IDateProvider } from '@app/providers/IDateProvider'
import { ITokensRepository } from '@app/repositories/ITokensRepository'
import { env } from '@infra/env'
import { sign, verify } from 'jsonwebtoken'

interface Payload {
  sub: string
  email: string
}

interface Response {
  newToken: string
  newRefreshToken: string
}

export class RefreshTokenUseCase {
  constructor(
    private tokensRepo: ITokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<Response> {
    const { email, sub: employeeId } = verify(
      refreshToken,
      env.JWT_REFRESH_SECRET_KEY,
    ) as Payload

    console.log({ email, employeeId })

    const token = await this.tokensRepo.findByRefreshToken(refreshToken)

    if (!token) {
      throw new AppError('Token not found!')
    }

    await this.tokensRepo.delete(token.id)

    const newToken = sign({}, env.JWT_SECRET_KEY, {
      subject: employeeId,
      expiresIn: env.TOKEN_EXPIRES_IN,
    })

    const refreshTokenData = sign({ email }, env.JWT_REFRESH_SECRET_KEY, {
      subject: employeeId,
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    })

    const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN.substring(
      2,
      1,
    )

    const refreshTokenExpiresDate = this.dateProvider.add(
      Number(REFRESH_TOKEN_EXPIRES_IN),
      'days',
    )

    const newRefreshToken = new Token({
      employeeId,
      refreshToken: refreshTokenData,
      expiresDate: refreshTokenExpiresDate,
    })

    await this.tokensRepo.create(newRefreshToken)

    return {
      newToken,
      newRefreshToken: refreshTokenData,
    }
  }
}

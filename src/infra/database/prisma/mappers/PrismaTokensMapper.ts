import { Token } from '@app/entities/Token'
import { Token as RawToken } from '@prisma/client'

export class PrismaTokensMapper {
  static toPrisma(token: Token): RawToken {
    return {
      id: token.id,
      refreshToken: token.refreshToken,
      expiresDate: token.expiresDate,
      employee_id: token.employeeId,
      createdAt: token.createdAt,
    }
  }

  static toDomain(raw: RawToken): Token {
    return new Token(
      {
        refreshToken: raw.refreshToken,
        expiresDate: raw.expiresDate,
        employeeId: raw.employee_id,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}

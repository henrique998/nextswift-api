import { Token } from '@app/entities/Token'
import { ITokensRepository } from '@app/repositories/ITokensRepository'
import { prisma } from '..'
import { PrismaTokensMapper } from '../mappers/PrismaTokensMapper'

export class PrismaTokensRepository implements ITokensRepository {
  async findByRefreshToken(refreshToken: string): Promise<Token | null> {
    const result = await prisma.token.findUnique({
      where: {
        refreshToken,
      },
    })

    if (!result) {
      return null
    }

    return PrismaTokensMapper.toDomain(result)
  }

  async create(token: Token): Promise<void> {
    const raw = PrismaTokensMapper.toPrisma(token)

    await prisma.token.create({
      data: {
        ...raw,
      },
    })
  }

  async delete(tokenId: string): Promise<void> {
    await prisma.token.delete({
      where: {
        id: tokenId,
      },
    })
  }
}

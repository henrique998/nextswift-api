import { Token } from '@app/entities/Token'

export interface ITokensRepository {
  findByRefreshToken(refreshToken: string): Promise<Token | null>
  create(token: Token): Promise<void>
  delete(tokenId: string): Promise<void>
}

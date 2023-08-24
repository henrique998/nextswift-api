import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

interface TokenProps {
  refreshToken: string
  expiresDate: Date
  employeeId: string
  createdAt: Date
}

export class Token {
  private _id: string
  private props: TokenProps

  constructor(props: Replace<TokenProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get refreshToken(): string {
    return this.props.refreshToken
  }

  public get expiresDate(): Date {
    return this.props.expiresDate
  }

  public get employeeId(): string {
    return this.props.employeeId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

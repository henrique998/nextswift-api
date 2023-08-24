import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'
import { Name } from './Name'

interface RoleProps {
  name: Name
  employeeId: string | null
  createdAt: Date
}

export class Role {
  private _id: string
  private props: RoleProps

  constructor(
    props: Replace<RoleProps, { createdAt?: Date; employeeId?: string | null }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      employeeId: props.employeeId ?? null,
    }
  }

  public get id(): string {
    return this._id
  }

  public get name(): Name {
    return this.props.name
  }

  public set name(name: Name) {
    this.props.name = name
  }

  public get employeeId(): string | null {
    return this.props.employeeId
  }

  public set employeeId(employeeId: string | null) {
    this.props.employeeId = employeeId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'
import { Email } from './Email'
import { Password } from './Password'

interface EmployeeProps {
  name: string
  email: Email
  password: Password
  ddd: number
  phone: number
  cpf: string
  avatar: string | null
  role: string | null
  createdAt: Date
  updatedAt?: Date | null
  dismissedAt?: Date | null
}

export class Employee {
  private _id: string
  private props: EmployeeProps

  constructor(
    props: Replace<EmployeeProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get email(): Email {
    return this.props.email
  }

  public set email(email: Email) {
    this.props.email = email
  }

  public get password(): Password {
    return this.props.password
  }

  public set password(password: Password) {
    this.props.password = password
  }

  public get ddd(): number {
    return this.props.ddd
  }

  public set ddd(ddd: number) {
    this.props.ddd = ddd
  }

  public get phone(): number {
    return this.props.phone
  }

  public set phone(phone: number) {
    this.props.phone = phone
  }

  public get cpf(): string {
    return this.props.cpf
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  public get avatar(): string | null {
    return this.props.avatar
  }

  public set avatar(avatar: string | null) {
    this.props.avatar = avatar
  }

  public get role(): string | null {
    return this.props.role
  }

  public set role(role: string | null) {
    this.props.role = role
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get dismissedAt(): Date | null | undefined {
    return this.props.dismissedAt
  }

  public update() {
    this.props.updatedAt = new Date()
  }

  public dismiss() {
    this.props.dismissedAt = new Date()
  }
}

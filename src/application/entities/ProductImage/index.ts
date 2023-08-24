import { Replace } from '@helpers/replace'
import { randomUUID } from 'crypto'

export interface ProductImageProps {
  url: string
  name: string
  size: number
  createdAt: Date
}

export class ProductImage {
  private _id: string
  private props: ProductImageProps

  constructor(
    props: Replace<ProductImageProps, { createdAt?: Date }>,
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

  public get url(): string {
    return this.props.url
  }

  public set url(url: string) {
    this.props.url = url
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get size(): number {
    return this.props.size
  }

  public set size(size: number) {
    this.props.size = size
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

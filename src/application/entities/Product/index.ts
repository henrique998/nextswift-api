import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'
import { Category } from '../Category'
import { ProductImage } from '../ProductImage'

export interface ProductProps {
  name: string
  excerpt: string
  description: string
  width: number
  height: number
  price: number
  quantity: number
  weight: number
  categories: Category[] | null
  images: ProductImage[] | null
  authorId: string | null
  createdAt: Date
  updatedAt?: Date | null
  removedAt?: Date | null
}

export class Product {
  private _id: string
  private props: ProductProps

  constructor(props: Replace<ProductProps, { createdAt?: Date }>, id?: string) {
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

  public get excerpt(): string {
    return this.props.excerpt
  }

  public set excerpt(excerpt: string) {
    this.props.excerpt = excerpt
  }

  public get description(): string {
    return this.props.description
  }

  public set description(description: string) {
    this.props.description = description
  }

  public get width(): number {
    return this.props.width
  }

  public set width(width: number) {
    this.props.width = width
  }

  public get height(): number {
    return this.props.height
  }

  public set height(height: number) {
    this.props.height = height
  }

  public get price(): number {
    return this.props.price
  }

  public set price(price: number) {
    this.props.price = price
  }

  public get quantity(): number {
    return this.props.quantity
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity
  }

  public get weight(): number {
    return this.props.weight
  }

  public set weight(weight: number) {
    this.props.weight = weight
  }

  public get categories(): Category[] | null {
    return this.props.categories
  }

  public set categories(categories: Category[] | null) {
    this.props.categories = categories
  }

  public get images(): ProductImage[] | null {
    return this.props.images
  }

  public get authorId(): string | null {
    return this.props.authorId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get removedAt(): Date | null | undefined {
    return this.props.removedAt
  }

  public set removedAt(value: Date | null | undefined) {
    this.props.removedAt = value
  }

  public update() {
    this.props.updatedAt = new Date()
  }

  public remove() {
    this.props.removedAt = new Date()
  }
}

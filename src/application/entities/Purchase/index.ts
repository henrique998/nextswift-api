import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEDIT_CARD'

interface PurchaseProps {
  total: number
  productsQty: number
  productId: string | null
  productName: string | null
  paymentMethod: PaymentMethod
  buyerId: string | null
  buyerName: string | null
  createdAt: Date
}

export class Purchase {
  private _id: string
  private props: PurchaseProps

  constructor(
    props: Replace<PurchaseProps, { createdAt?: Date }>,
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

  public get total(): number {
    return this.props.total
  }

  public set total(total: number) {
    this.props.total = total
  }

  public get productsQty(): number {
    return this.props.productsQty
  }

  public set productsQty(productQty: number) {
    this.props.productsQty = productQty
  }

  public get productName(): string | null {
    return this.props.productName
  }

  public get productId(): string | null {
    return this.props.productId
  }

  public set productId(productId: string | null) {
    this.props.productId = productId
  }

  public get paymentMethod(): PaymentMethod {
    return this.props.paymentMethod
  }

  public get buyerId(): string | null {
    return this.props.buyerId
  }

  public get buyerName(): string | null {
    return this.props.buyerName
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}

import { Purchase } from '@app/entities/Purchase'
import { formatPrice } from '@infra/utils/formatPrice'

const paymentMethod = {
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de crédito',
  DEDIT_CARD: 'Cartão de débito',
}

export class PurchaseViewModel {
  static toHttp(purchase: Purchase) {
    const total = formatPrice(purchase.total)

    return {
      id: purchase.id,
      total,
      product: purchase.productName,
      quantity: purchase.productsQty,
      paymentMethod: paymentMethod[purchase.paymentMethod],
      customer: purchase.buyerName,
    }
  }
}

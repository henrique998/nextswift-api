import { PaymentMethod, Purchase } from '@app/entities/Purchase'
import { AppError } from '@app/errors/AppError'
import { CustomerNotFoundError } from '@app/errors/CustomerNotFound'
import { IMailProvider } from '@app/providers/IMailProvider'
import { INFEProvider } from '@app/providers/INFEProvider'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'
import { resolve } from 'node:path'

interface Request {
  productId: string
  productsQty: number
  buyerId: string
  paymentMethod: PaymentMethod
}

type Response = void

export class BuyProductUseCase {
  constructor(
    private purchasesRepo: IPurchasesRepository,
    private productsRepo: IProductsRepository,
    private customersRepo: ICustomersRepository,
    private nfeProvider: INFEProvider,
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    productId,
    productsQty,
    buyerId,
    paymentMethod,
  }: Request): Promise<Response> {
    const product = await this.productsRepo.findById(productId)

    if (!product) {
      throw new AppError('product not found!')
    }

    const customerExists = await this.customersRepo.findById(buyerId)

    if (!customerExists) {
      throw new CustomerNotFoundError()
    }

    if (product.quantity <= 1) {
      throw new AppError('Product unavailable!')
    }

    const total = product.price * productsQty

    const purchase = new Purchase({
      total,
      buyerId,
      paymentMethod,
      productId,
      productsQty,
      buyerName: customerExists.name,
      productName: product.name,
    })

    await this.purchasesRepo.create(purchase)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'infra',
      'views',
      'emails',
      'purchaseNFE.hbs',
    )

    const purchaseVariables = {
      name: customerExists.name,
    }

    const nfeBuffer = await this.nfeProvider.generateNFE({
      customerName: customerExists.name,
      product: {
        name: product.name,
        price: product.price,
        quantity: productsQty,
      },
      total,
    })

    product.quantity = product.quantity - productsQty
    product.update()

    await this.productsRepo.save(product)

    await this.mailProvider.sendMail({
      to: customerExists.email,
      subject: 'Nota fiscal da compra',
      path: templatePath,
      variables: purchaseVariables,
      attachments: [
        {
          filename: 'purchaseNFE.pdf',
          content: nfeBuffer,
          contentType: 'application/pdf',
        },
      ],
    })
  }
}

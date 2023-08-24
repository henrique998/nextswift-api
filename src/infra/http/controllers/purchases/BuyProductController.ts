import { BuyProductUseCase } from '@app/useCases/purchases/BuyProductUseCase'
import { PrismaCustomersRepository } from '@infra/database/prisma/repositories/PrismaCustomersRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { MailtrapMailProvider } from '@infra/providers/email/MailtrapMailProvider'
import { PDFKitNfeProvider } from '@infra/providers/nfe/PDFKitNfeProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

const bodySchema = z.object({
  buyerId: z.string().uuid(),
  productsQty: z.coerce.number(),
  paymentMethod: z.enum(['CASH', 'CREDIT_CARD', 'DEDIT_CARD']),
})

export class BuyProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const { buyerId, productsQty, paymentMethod } = bodySchema.parse(req.body)

    const purchasesRepo = new PrismaPurchasesRepository()
    const productsRepo = new PrismaProductsRepository()
    const customersRepo = new PrismaCustomersRepository()
    const nfeProvider = new PDFKitNfeProvider()
    const mailProvider = new MailtrapMailProvider()

    const buyProductUseCase = new BuyProductUseCase(
      purchasesRepo,
      productsRepo,
      customersRepo,
      nfeProvider,
      mailProvider,
    )

    await buyProductUseCase.execute({
      productId,
      productsQty,
      buyerId,
      paymentMethod,
    })

    return res.status(201).json({ message: 'successfully purchased product!' })
  }
}

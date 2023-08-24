import { randomBytes } from 'node:crypto'

import { AppError } from '@app/errors/AppError'
import {
  IPurchasesPDFReportProvider,
  PDFPurchaseInfo,
} from '@app/providers/IPurchasesPDFReportProvider'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'

interface Request {
  startDate: string
  endDate: string
  page?: number
  limit?: number
}

interface Response {
  buffer: Buffer
  filename: string
}

export class GeneratePDFReportUseCase {
  constructor(
    private purchasesRepo: IPurchasesRepository,
    private productsRepo: IProductsRepository,
    private purchasesPdfReportProvider: IPurchasesPDFReportProvider,
  ) {}

  async execute({
    startDate,
    endDate,
    page = 0,
    limit = 10,
  }: Request): Promise<Response> {
    const res = await this.purchasesRepo.paginate({
      startDate,
      endDate,
      page,
      limit,
    })

    if (!res?.purchases) {
      throw new AppError(
        'Report generation is not possible. not enough shopping!',
      )
    }

    const purchasesInfo: PDFPurchaseInfo[] = []

    for (const purchase of res.purchases) {
      const product = await this.productsRepo.findById(purchase.productId!)

      if (product) {
        purchasesInfo.push({
          productName: product.name,
          productQty: purchase.productsQty,
          productPrice: product.price,
          total: purchase.total,
        })
      }
    }

    const buffer = await this.purchasesPdfReportProvider.generatePDF(
      purchasesInfo,
    )

    const hash = randomBytes(6).toString('hex')
    const filename = `${hash}-report.pdf`

    return {
      buffer,
      filename,
    }
  }
}

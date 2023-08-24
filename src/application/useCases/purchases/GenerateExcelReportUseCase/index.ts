import { AppError } from '@app/errors/AppError'
import {
  ExcelPurchaseInfo,
  IPurchasesExcelReportProvider,
} from '@app/providers/IPurchasesExcelReportProvider'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'

interface Request {
  startDate: string
  endDate: string
  page?: number
  limit?: number
}

interface Response {
  filename: string
  buffer: Buffer
}

export class GenerateExcelReportUseCase {
  constructor(
    private purchasesRepo: IPurchasesRepository,
    private productsRepo: IProductsRepository,
    private purchasesExcelReportProvider: IPurchasesExcelReportProvider,
  ) {}

  async execute({
    startDate,
    endDate,
    page = 1,
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

    const purchasesInfo: ExcelPurchaseInfo[] = []

    for (const purchase of res.purchases) {
      const product = await this.productsRepo.findById(purchase.productId!)

      if (product) {
        purchasesInfo.push({
          id: purchase.id,
          productName: product.name,
          productQty: purchase.productsQty,
          productPrice: product.price,
          total: purchase.total,
        })
      }
    }

    const { filename, buffer } =
      await this.purchasesExcelReportProvider.generateExcel(purchasesInfo)

    return { filename, buffer }
  }
}

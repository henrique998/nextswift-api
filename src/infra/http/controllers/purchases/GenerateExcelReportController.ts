import { Request, Response } from 'express'
import { z } from 'zod'

import { GenerateExcelReportUseCase } from '@app/useCases/purchases/GenerateExcelReportUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { ExcelJsPurchaseReportProvider } from '@infra/providers/report/ExcelJsPurchasePDFReportProvider'

const querySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export class GenerateExcelReportController {
  async handle(req: Request, res: Response): Promise<void> {
    const {
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = querySchema.parse(req.query)

    const purchasesRepo = new PrismaPurchasesRepository()
    const productsRepo = new PrismaProductsRepository()
    const purchasesExcelReportProvider = new ExcelJsPurchaseReportProvider()
    const generateExcelReportUseCase = new GenerateExcelReportUseCase(
      purchasesRepo,
      productsRepo,
      purchasesExcelReportProvider,
    )

    const { filename, buffer } = await generateExcelReportUseCase.execute({
      startDate,
      endDate,
      page: Number(page),
      limit: Number(limit),
    })

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

    res.setHeader('Access-Control-Expose-Headers', 'x-filename')
    res.setHeader('x-filename', filename)

    res.send(buffer)
  }
}

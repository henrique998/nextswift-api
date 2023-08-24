import { GeneratePDFReportUseCase } from '@app/useCases/purchases/GeneratePDFReportUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { PDFKitPurchaseReportProvider } from '@infra/providers/report/PDFKitPurchasePDFReportProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

export class GeneratePDFReportController {
  async handle(req: Request, res: Response): Promise<void> {
    const {
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = querySchema.parse(req.query)

    const purchasesRepo = new PrismaPurchasesRepository()
    const productsRepo = new PrismaProductsRepository()
    const purchasesPdfReportProvider = new PDFKitPurchaseReportProvider()
    const generatePDFReportUseCase = new GeneratePDFReportUseCase(
      purchasesRepo,
      productsRepo,
      purchasesPdfReportProvider,
    )

    const { buffer, filename } = await generatePDFReportUseCase.execute({
      startDate,
      endDate,
      page: Number(page),
      limit: Number(limit),
    })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)

    res.setHeader('Access-Control-Expose-Headers', 'x-filename')
    res.setHeader('x-filename', filename)

    res.send(buffer)
  }
}

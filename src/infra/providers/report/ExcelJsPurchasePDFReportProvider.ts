import { Buffer } from 'buffer'
import { Workbook } from 'exceljs'

import {
  ExcelPurchaseInfo,
  IPurchasesExcelReportProvider,
  PurchasesExcelReportData,
} from '@app/providers/IPurchasesExcelReportProvider'
import { formatPrice } from '@infra/utils/formatPrice'
import { randomBytes } from 'node:crypto'

export class ExcelJsPurchaseReportProvider
  implements IPurchasesExcelReportProvider
{
  async generateExcel(
    purchases: ExcelPurchaseInfo[],
  ): Promise<PurchasesExcelReportData> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Vendas')

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Produto', key: 'productName', width: 30 },
      { header: 'Quantidade', key: 'productQuantity', width: 15 },
      { header: 'Preço', key: 'productPrice', width: 15 },
      { header: 'Total', key: 'total', width: 20 },
    ]

    for (const purchase of purchases) {
      worksheet.addRow({
        id: purchase.id,
        productName: purchase.productName,
        productQuantity: purchase.productQty,
        productPrice: formatPrice(purchase.productPrice),
        total: formatPrice(purchase.total),
      })
    }

    const hash = randomBytes(6).toString('hex')
    const filename = `${hash}-report.xlsx`

    const bufferData = await workbook.xlsx.writeBuffer()
    const buffer = Buffer.from(bufferData)

    return {
      filename,
      buffer,
    }
  }
}

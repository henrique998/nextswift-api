import PDFDocument from 'pdfkit'

import {
  IPurchasesPDFReportProvider,
  PDFPurchaseInfo,
} from '@app/providers/IPurchasesPDFReportProvider'
import { formatPrice } from '@infra/utils/formatPrice'

export class PDFKitPurchaseReportProvider
  implements IPurchasesPDFReportProvider
{
  async generatePDF(data: PDFPurchaseInfo[]): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument()

      doc.fontSize(18).text('Relatório de Compras', { align: 'center' })
      doc.moveDown()

      for (const purchase of data) {
        doc.fontSize(14).text(`Produto: ${purchase.productName}`)
        doc.fontSize(12).text(`Quantidade: ${purchase.productQty}`)
        doc.fontSize(12).text(`Preço: ${formatPrice(purchase.productPrice)}`)
        doc.fontSize(12).text(`Total: ${formatPrice(purchase.total)}`)
        doc.moveDown()
      }

      const buffers: Buffer[] = []

      doc.on('data', (chunk) => buffers.push(chunk))
      doc.on('end', () => {
        const buffer = Buffer.concat(buffers)
        resolve(buffer)
      })

      doc.end()
    })
  }
}

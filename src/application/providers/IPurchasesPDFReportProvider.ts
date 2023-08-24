export interface PDFPurchaseInfo {
  productName: string
  productQty: number
  productPrice: number
  total: number
}

export interface IPurchasesPDFReportProvider {
  generatePDF(data: PDFPurchaseInfo[]): Promise<Buffer>
}

import { PDFPurchaseInfo } from './IPurchasesPDFReportProvider'

export interface ExcelPurchaseInfo extends PDFPurchaseInfo {
  id: string
  total: number
}

export interface PurchasesExcelReportData {
  filename: string
  // fullFilePath: string
  buffer: Buffer
}

export interface IPurchasesExcelReportProvider {
  generateExcel(
    purchases: ExcelPurchaseInfo[],
  ): Promise<PurchasesExcelReportData>
}

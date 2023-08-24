import XLSX from 'xlsx'

import {
    IProductsExcelProvider,
    ProductData,
} from '@app/providers/IProductsExcelProvider'

export class XLSXProductsExcelProvider implements IProductsExcelProvider {
  async load(file: Express.Multer.File): Promise<ProductData[]> {
    try {
      const workbook = XLSX.readFile(file.path)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      const data: ProductData[] = []

      const header: any = {}
      const range = XLSX.utils.decode_range(worksheet['!ref'] ?? '')

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: col, r: 0 })]
        header[col] = cell ? cell.v : col
      }

      const nameIndex = Object.values(header).indexOf('name')
      const excerptIndex = Object.values(header).indexOf('excerpt')
      const descriptionIndex = Object.values(header).indexOf('description')
      const widthIndex = Object.values(header).indexOf('width')
      const heightIndex = Object.values(header).indexOf('height')
      const weightIndex = Object.values(header).indexOf('weight')
      const quantityIndex = Object.values(header).indexOf('quantity')
      const priceIndex = Object.values(header).indexOf('price')

      for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const nameCell =
          worksheet[XLSX.utils.encode_cell({ c: nameIndex, r: row })]
        const descriptionCell =
          worksheet[XLSX.utils.encode_cell({ c: descriptionIndex, r: row })]
        const excerptCell =
          worksheet[XLSX.utils.encode_cell({ c: excerptIndex, r: row })]
        const widthCell =
          worksheet[XLSX.utils.encode_cell({ c: widthIndex, r: row })]
        const heightCell =
          worksheet[XLSX.utils.encode_cell({ c: heightIndex, r: row })]
        const weightCell =
          worksheet[XLSX.utils.encode_cell({ c: weightIndex, r: row })]
        const quantityCell =
          worksheet[XLSX.utils.encode_cell({ c: quantityIndex, r: row })]
        const priceCell =
          worksheet[XLSX.utils.encode_cell({ c: priceIndex, r: row })]

        const name = nameCell ? nameCell.v : ''
        const excerpt = excerptCell ? excerptCell.v : ''
        const description = descriptionCell ? descriptionCell.v : ''
        const width = widthCell ? widthCell.v : 0
        const height = heightCell ? heightCell.v : 0
        const weight = weightCell ? weightCell.v : 0
        const quantity = quantityCell ? quantityCell.v : 0
        const price = priceCell ? priceCell.v : '0.0'

        data.push({
          name,
          excerpt,
          description,
          width,
          height,
          weight,
          quantity,
          price,
        })
      }

      return data
    } catch (error: any) {
      console.error('Erro ao processar a planilha:', error.message)
      return []
    }
  }
}

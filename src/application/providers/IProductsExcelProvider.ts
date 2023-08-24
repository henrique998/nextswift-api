export interface ProductData {
  name: string
  excerpt: string
  description: string
  width: number
  height: number
  quantity: number
  price: string
  weight: number
}

export interface IProductsExcelProvider {
  load(file: Express.Multer.File): Promise<ProductData[]>
}

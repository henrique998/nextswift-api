type PurchasedProduct = {
  name: string
  price: number
  quantity: number
}

export interface NFEProviderProps {
  customerName: string
  product: PurchasedProduct
  total: number
}

export interface INFEProvider {
  generateNFE(data: NFEProviderProps): Promise<Buffer>
}

export interface IBarCodeProvider {
  generate(productCode: string): Promise<void>
}

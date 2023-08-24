export interface IStorageProvider {
  save(file: string, folder: string): Promise<void>
  delete(file: string, folder: string): Promise<void>
}

import fs from 'fs'
import { resolve } from 'node:path'

import { IStorageProvider } from '@app/providers/IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  private uploadsFolder = resolve(__dirname, '..', '..', 'uploads')

  async save(file: string, folder: string): Promise<void> {
    await fs.promises.rename(
      resolve(this.uploadsFolder, file),
      resolve(`${this.uploadsFolder}/${folder}`, file),
    )
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(this.uploadsFolder, folder, file)

    try {
      await fs.promises.stat(filename)
    } catch {
      return
    }
    await fs.promises.unlink(filename)
  }
}

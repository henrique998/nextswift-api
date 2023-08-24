import { toBuffer, ToBufferOptions } from 'bwip-js'
import fs from 'fs'
import { resolve } from 'node:path'

import { IBarCodeProvider } from '@app/providers/IBarCodeProvider'
import { IStorageProvider } from '@app/providers/IStorageProvider'

export class BwipJsBarCodeProvider implements IBarCodeProvider {
  constructor(private storageProvider: IStorageProvider) {}

  async generate(productId: string): Promise<void> {
    const options: ToBufferOptions = {
      bcid: 'code128',
      text: productId,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    }

    const buffer = await toBuffer(options)

    const barcodeFolder = resolve(__dirname, '..', '..', 'uploads', 'barCode')

    const file = `${barcodeFolder}/${productId}.png`

    await fs.promises.writeFile(file, buffer)

    await this.storageProvider.save(`${productId}.png`, 'barCode')
  }
}

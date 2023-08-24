import { S3 } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'node:path'

import { IStorageProvider } from '@app/providers/IStorageProvider'
import { env } from '@infra/env'

export class S3StorageProvider implements IStorageProvider {
  private uploadsFolder = resolve(__dirname, '..', '..', 'uploads')
  private client: S3

  constructor() {
    this.client = new S3({
      region: env.AWS_BUCKET_REGION,
    })
  }

  async save(file: string, folder: string): Promise<void> {
    const originalName = resolve(`${this.uploadsFolder}/${folder}`, file)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.getType(originalName)

    await this.client.putObject({
      Bucket: env.AWS_BUCKET,
      Key: `${folder}/${file}`,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: String(ContentType),
    })

    await fs.promises.unlink(originalName)
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: env.AWS_BUCKET,
      Key: `${folder}/${file}`,
    })
  }
}

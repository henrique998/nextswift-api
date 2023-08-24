import { UploadProductImagesUseCase } from '@app/useCases/products/UploadProductImagesUseCase'
import { PrismaProductImagesRepository } from '@infra/database/prisma/repositories/PrismaProductImagesRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { S3StorageProvider } from '@infra/providers/storage/S3StorageProvider'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string().uuid(),
})

export class UploadProductImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)
    const files = req.files as Express.Multer.File[]

    const productsRepo = new PrismaProductsRepository()
    const productImagesRepo = new PrismaProductImagesRepository()
    const storageProvider = new S3StorageProvider()
    const uploadProductImagesUseCase = new UploadProductImagesUseCase(
      productsRepo,
      productImagesRepo,
      storageProvider,
    )

    await uploadProductImagesUseCase.execute({
      productId,
      images: files,
    })

    return res.status(201).json({ message: 'images uploaded successfuly!' })
  }
}

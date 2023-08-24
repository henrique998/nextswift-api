import { GetProductImagesUseCase } from '@app/useCases/products/GetProductImagesUseCase'
import { PrismaProductImagesRepository } from '@infra/database/prisma/repositories/PrismaProductImagesRepository'
import { ProductImageViewModel } from '@infra/http/viewModels/ProductImageViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string(),
})

export class GetProductImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)

    const productImagesRepo = new PrismaProductImagesRepository()
    const getProductImagesUseCase = new GetProductImagesUseCase(
      productImagesRepo,
    )

    const { productImages } = await getProductImagesUseCase.execute({
      productId,
    })

    return res.json(productImages.map(ProductImageViewModel.toHttp))
  }
}

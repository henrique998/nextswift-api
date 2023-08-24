import { GetOneProductByIdUseCase } from '@app/useCases/products/GetOneProductByIdUseCase'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { ProductViewModel } from '@infra/http/viewModels/ProductViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  productId: z.string(),
})

export class GetOneProductByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { productId } = paramsSchema.parse(req.params)

    const productsRepo = new PrismaProductsRepository()
    const getOneProductByIdUseCase = new GetOneProductByIdUseCase(productsRepo)

    const { product } = await getOneProductByIdUseCase.execute({ productId })

    return res.json(ProductViewModel.toHttp(product))
  }
}

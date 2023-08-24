import { GetAllMetricsUseCase } from '@app/useCases/metrics/GetAllMetricsUseCase'
import { PrismaCategoriesRepository } from '@infra/database/prisma/repositories/PrismaCategoriesRepository'
import { PrismaCustomersRepository } from '@infra/database/prisma/repositories/PrismaCustomersRepository'
import { PrismaEmployeesRepository } from '@infra/database/prisma/repositories/PrismaEmployeesRepository'
import { PrismaProductsRepository } from '@infra/database/prisma/repositories/PrismaProductsRepository'
import { PrismaPurchasesRepository } from '@infra/database/prisma/repositories/PrismaPurchasesRepository'
import { PrismaSuppliersRepository } from '@infra/database/prisma/repositories/PrismaSuppliersRepository'
import { Request, Response } from 'express'

export class GetAllMetricsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const productsRepo = new PrismaProductsRepository()
    const purchasesRepo = new PrismaPurchasesRepository()
    const customersRepo = new PrismaCustomersRepository()
    const employeesRepo = new PrismaEmployeesRepository()
    const categoriesRepo = new PrismaCategoriesRepository()
    const suppliersRepo = new PrismaSuppliersRepository()

    const getAllMetricsUseCase = new GetAllMetricsUseCase(
      productsRepo,
      purchasesRepo,
      customersRepo,
      employeesRepo,
      categoriesRepo,
      suppliersRepo,
    )

    const result = await getAllMetricsUseCase.execute()

    return res.json(result)
  }
}

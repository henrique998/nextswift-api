import { ICategoriesRepository } from '@app/repositories/ICategoriesRepository'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { IProductsRepository } from '@app/repositories/IProductsRepository'
import { IPurchasesRepository } from '@app/repositories/IPurchasesRepository'
import { ISuppliersRepository } from '@app/repositories/ISuppliersRepository'
import { redis } from '@infra/database/redis'

interface Response {
  productsCount: number
  purchasesCount: number
  customersCount: number
  employeesCount: number
  categoriesCount: number
  suppliersCount: number
}

export class GetAllMetricsUseCase {
  constructor(
    private productsRepo: IProductsRepository,
    private purchasesRepo: IPurchasesRepository,
    private customersRepo: ICustomersRepository,
    private employeesRepo: IEmployeesRepository,
    private categoriesRepo: ICategoriesRepository,
    private suppliersRepo: ISuppliersRepository,
  ) {}

  async execute(): Promise<Response> {
    const cachedMetrics = await redis.get('metrics:count')

    if (cachedMetrics) {
      const parsedMetrics = JSON.parse(cachedMetrics)

      return parsedMetrics
    }

    const productsCount = await this.productsRepo.count()
    const purchasesCount = await this.purchasesRepo.count()
    const customersCount = await this.customersRepo.count()
    const employeesCount = await this.employeesRepo.count()
    const categoriesCount = await this.categoriesRepo.count()
    const suppliersCount = await this.suppliersRepo.count()

    await redis.set(
      'metrics:count',
      JSON.stringify({
        productsCount,
        purchasesCount,
        customersCount,
        employeesCount,
        categoriesCount,
        suppliersCount,
      }),
      'EX',
      20,
    )

    return {
      productsCount,
      purchasesCount,
      customersCount,
      employeesCount,
      categoriesCount,
      suppliersCount,
    }
  }
}

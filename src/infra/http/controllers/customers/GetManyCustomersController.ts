import { GetManyCustomersUseCase } from '@app/useCases/customers/GetManyCustomers'
import { PrismaCustomersRepository } from '@infra/database/prisma/repositories/PrismaCustomersRepository'
import { CustomerViewModel } from '@infra/http/viewModels/CustomerViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})

export class GetManyCustomersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = querySchema.parse(req.query)

    const customersRepo = new PrismaCustomersRepository()
    const getManyCustomersUseCase = new GetManyCustomersUseCase(customersRepo)

    const result = await getManyCustomersUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    })

    const customers = result.customers.map(CustomerViewModel.toHttp)

    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', result.totalCount)

    return res.json(customers)
  }
}

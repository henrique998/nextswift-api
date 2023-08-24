import { GetOneCustomerByIdUseCase } from '@app/useCases/customers/GetOneCustomerByIdUseCase'
import { PrismaCustomersRepository } from '@infra/database/prisma/repositories/PrismaCustomersRepository'
import { CustomerViewModel } from '@infra/http/viewModels/CustomerViewModel'
import { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
  customerId: z.string().uuid(),
})

export class GetOneCustomerByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { customerId } = paramsSchema.parse(req.params)

    const customersRepo = new PrismaCustomersRepository()
    const getOneCustomerByIdUseCase = new GetOneCustomerByIdUseCase(
      customersRepo,
    )

    const { customer } = await getOneCustomerByIdUseCase.execute({ customerId })

    return res.json(CustomerViewModel.toHttp(customer))
  }
}

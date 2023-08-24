import { GetAllCustomersUseCase } from '@app/useCases/customers/GetAllCustomersUseCase'
import { PrismaCustomersRepository } from '@infra/database/prisma/repositories/PrismaCustomersRepository'
import { CustomerViewModel } from '@infra/http/viewModels/CustomerViewModel'
import { Request, Response } from 'express'

export class GetAllCustomersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const customersRepo = new PrismaCustomersRepository()
    const getAllCustomersUseCase = new GetAllCustomersUseCase(customersRepo)

    const { customers } = await getAllCustomersUseCase.execute()

    return res.json(customers.map(CustomerViewModel.toHttp))
  }
}

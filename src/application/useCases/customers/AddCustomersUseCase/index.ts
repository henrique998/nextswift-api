import { Customer } from '@app/entities/Customer'
import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { Cpf } from '@app/entities/Customer/Cpf'
import { AppError } from '@app/errors/AppError'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Request {
  name: string
  email: string
  cpf?: string | null
  ddd: number
  phone: number
  cep: string
  street: string
  number: number
  complement?: string | null
  uf: string
}

type Response = void

export class AddCustomerUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute(data: Request): Promise<Response> {
    const {
      name,
      email,
      cpf,
      ddd,
      phone,
      cep,
      street,
      number,
      complement,
      uf,
    } = data

    const customerAlreadyExists = await this.customersRepo.findByEmail(email)

    if (customerAlreadyExists) {
      throw new AppError('Customer Already Exists!')
    }

    const customer = new Customer({
      name,
      email,
      cpf: cpf ? new Cpf(cpf) : null,
      ddd,
      phone,
      address: new Address({
        cep: new Cep(cep),
        street,
        number,
        complement,
        uf,
      }),
    })

    await this.customersRepo.create(customer)
  }
}

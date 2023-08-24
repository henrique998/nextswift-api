import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { CustomerNotFoundError } from '@app/errors/CustomerNotFound'
import { ICustomersRepository } from '@app/repositories/ICustomersRepository'

interface Request {
  customerId: string
  name?: string
  email?: string
  phone?: number
  cep?: string
  street?: string
  number?: number
  complement?: string
  uf?: string
}

type Response = void

export class UpdateCustomerInfoUseCase {
  constructor(private customersRepo: ICustomersRepository) {}

  async execute({ customerId, ...data }: Request): Promise<Response> {
    const customer = await this.customersRepo.findById(customerId)

    if (!customer) {
      throw new CustomerNotFoundError()
    }

    customer.name = data.name ?? customer.name
    customer.email = data.email ?? customer.email
    customer.phone = data.phone ?? customer.phone
    customer.address = new Address({
      cep: new Cep(data.cep ?? customer.address.cep.value),
      street: data.street ?? customer.address.street,
      number: data.number ?? customer.address.number,
      complement: data.complement ?? customer.address.complement,
      uf: data.uf ?? customer.address.uf,
    })
    customer.update()

    await this.customersRepo.save(customer)
  }
}

import { Customer } from '@app/entities/Customer'
import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { Cpf } from '@app/entities/Customer/Cpf'
import { Customer as RawCustomer } from '@prisma/client'

export class PrismaCustomersMapper {
  static toPrisma(customer: Customer): RawCustomer {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf?.value ?? null,
      ddd: customer.ddd,
      phone: customer.phone,
      deletedAt: customer.deletedAt ?? null,
      cep: customer.address.cep.value,
      street: customer.address.street,
      number: customer.address.number,
      complement: customer.address.complement ?? null,
      uf: customer.address.uf,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt ?? null,
    }
  }

  static toDomain(rawCustomer: RawCustomer): Customer {
    return new Customer(
      {
        name: rawCustomer.name,
        email: rawCustomer.email,
        cpf: rawCustomer.cpf ? new Cpf(rawCustomer.cpf) : null,
        ddd: rawCustomer.ddd,
        phone: rawCustomer.phone,
        address: new Address({
          cep: new Cep(rawCustomer.cep),
          street: rawCustomer.street,
          number: rawCustomer.number,
          complement: rawCustomer.complement,
          uf: rawCustomer.uf,
        }),
        deletedAt: rawCustomer.deletedAt,
        createdAt: rawCustomer.createdAt,
        updatedAt: rawCustomer.updatedAt,
      },
      rawCustomer.id,
    )
  }
}

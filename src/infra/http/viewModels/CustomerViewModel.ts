import { Customer } from '@app/entities/Customer'

export class CustomerViewModel {
  static toHttp(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf?.value,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      address: {
        street: customer.address.street,
        complement: customer.address.complement,
        number: customer.address.number,
        cep: customer.address.cep.value,
        uf: customer.address.uf,
      },
    }
  }
}

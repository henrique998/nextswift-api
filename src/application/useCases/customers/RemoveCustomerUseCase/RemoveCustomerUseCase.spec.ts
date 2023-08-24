import { beforeEach, describe, expect, it } from 'vitest'

import { Customer } from '@app/entities/Customer'
import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { Cpf } from '@app/entities/Customer/Cpf'
import { AppError } from '@app/errors/AppError'
import { CustomersRepositoryInMemory } from '@test/repositories/CustomersRepositoryInMemory'
import { RemoveCustomerUseCase } from '.'

let customersRepoInMemory: CustomersRepositoryInMemory
let removeCustomerUseCase: RemoveCustomerUseCase

describe('RemoveCustomerUseCase', () => {
  beforeEach(() => {
    customersRepoInMemory = new CustomersRepositoryInMemory()
    removeCustomerUseCase = new RemoveCustomerUseCase(customersRepoInMemory)
  })

  it('should not be able to remove a customer that not exists', async () => {
    await expect(
      removeCustomerUseCase.execute({ customerId: 'fake-id' }),
    ).rejects.toEqual(new AppError('Customer not found!'))
  })

  it('should be able to remove a customer', async () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: new Cpf('931.147.680-32'),
      cnpj: null,
      address: new Address({
        cep: new Cep('57300-000'),
        street: 'brasil',
        number: 31,
        uf: 'al',
      }),
    })

    await customersRepoInMemory.create(customer)

    await removeCustomerUseCase.execute({ customerId: customer.id })

    expect(customersRepoInMemory.customers[0].deletedAt).toBeInstanceOf(Date)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { Customer } from '@app/entities/Customer'
import { Address } from '@app/entities/Customer/Address'
import { Cep } from '@app/entities/Customer/Cep'
import { Cpf } from '@app/entities/Customer/Cpf'
import { CustomerNotFoundError } from '@app/errors/CustomerNotFound'
import { CustomersRepositoryInMemory } from '@test/repositories/CustomersRepositoryInMemory'
import { UpdateCustomerInfoUseCase } from '.'

let customersRepoInMemory: CustomersRepositoryInMemory
let updateCustomerInfoUseCase: UpdateCustomerInfoUseCase

describe('UpdateCustomerInfoUseCase', () => {
  beforeEach(() => {
    customersRepoInMemory = new CustomersRepositoryInMemory()
    updateCustomerInfoUseCase = new UpdateCustomerInfoUseCase(
      customersRepoInMemory,
    )
  })

  it('should not be able to update a customer that not exists', async () => {
    await expect(
      updateCustomerInfoUseCase.execute({ customerId: 'fake-id' }),
    ).rejects.toEqual(new CustomerNotFoundError())
  })

  it('should be able to update a customer', async () => {
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

    await updateCustomerInfoUseCase.execute({
      customerId: customer.id,
      name: 'jhon updated',
      email: 'jhonupdated@gmail.com',
    })

    expect(customersRepoInMemory.customers[0].name).toEqual('jhon updated')
    expect(customersRepoInMemory.customers[0].email).toEqual(
      'jhonupdated@gmail.com',
    )
  })
})
